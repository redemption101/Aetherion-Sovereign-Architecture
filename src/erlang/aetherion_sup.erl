-module(aetherion_sup).
-behaviour(supervisor).

%% API
-export([start_link/0]).

%% Supervisor callbacks
-export([init/1]).

-define(SERVER, ?MODULE).

start_link() ->
    supervisor:start_link({local, ?SERVER}, ?MODULE, []).

%% OTP Supervisor specification for Pillar 2: Self-Healing Resilience
init([]) ->
    %% Max 3 restarts within 5 seconds before escalating
    SupFlags = #{
        strategy => one_for_one,
        intensity => 3,
        period => 5
    },

    %% Secure Core Aetherion process specifications
    ChildSpecs = [
        #{
            id => aetherion_core,
            start => {aetherion_core, start_link, []},
            restart => permanent,
            shutdown => 5000,
            type => worker,
            modules => [aetherion_core]
        }
    ],

    {ok, {SupFlags, ChildSpecs}}.
