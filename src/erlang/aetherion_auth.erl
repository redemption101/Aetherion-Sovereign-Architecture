-module(aetherion_auth).
-export([init/0, register_user/2, login_user/2, verify_session/1]).

%% Key record definitions for Sovereign Identity
-record(user, {
    username :: binary(),
    password_hash :: binary(),
    salt :: binary(),
    created_at :: integer()
}).

-record(session, {
    token :: binary(),
    username :: binary(),
    expires_at :: integer()
}).

%% Initialize ETS tables for transient storage of credentials and sessions
init() ->
    ets:new(users_table, [set, public, named_table, {keypos, #user.username}]),
    ets:new(sessions_table, [set, public, named_table, {keypos, #session.token}]),
    ok.

%% Secure User Registration with SHA-256 password hashing + custom salting
register_user(Username, Password) when is_binary(Username), is_binary(Password) ->
    case ets:lookup(users_table, Username) of
        [] ->
            Salt = crypto:strong_rand_bytes(16),
            PasswordHash = hash_password(Password, Salt),
            NewUser = #user{
                username = Username,
                password_hash = PasswordHash,
                salt = Salt,
                created_at = erlang:system_time(second)
            },
            ets:insert(users_table, NewUser),
            {ok, Username};
        [_Existing] ->
            {error, already_exists}
    end.

%% Secure User Login
login_user(Username, Password) when is_binary(Username), is_binary(Password) ->
    case ets:lookup(users_table, Username) of
        [#user{password_hash = ExpectedHash, salt = Salt}] ->
            InputHash = hash_password(Password, Salt),
            case InputHash of
                ExpectedHash ->
                    SessionToken = base64:encode(crypto:strong_rand_bytes(32)),
                    Expiry = erlang:system_time(second) + 86400, %% 24 hour session
                    NewSession = #session{
                        token = SessionToken,
                        username = Username,
                        expires_at = Expiry
                    },
                    ets:insert(sessions_table, NewSession),
                    {ok, SessionToken};
                _Mismatch ->
                    {error, invalid_credentials}
            end;
        [] ->
            {error, not_found}
    end.

%% Verify Session Token
verify_session(Token) when is_binary(Token) ->
    case ets:lookup(sessions_table, Token) of
        [#session{username = Username, expires_at = Expiry}] ->
            CurrentTime = erlang:system_time(second),
            if 
                Expiry > CurrentTime -> {ok, Username};
                true -> 
                    ets:delete(sessions_table, Token),
                    {error, expired}
            end;
        [] ->
            {error, invalid_token}
    end.

%% Helper hash routine (Erlang Crypto Wrapper)
hash_password(Password, Salt) ->
    Combined = <<Password/binary, Salt/binary>>,
    crypto:hash(sha256, Combined).
