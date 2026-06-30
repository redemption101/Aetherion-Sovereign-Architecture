export interface DictionaryEntry {
  term: string;
  type: "pillar" | "keyword";
  philosophicalDef: string;
  technicalDef: string;
}

export const CODEX_DICTIONARY: DictionaryEntry[] = [
  // Core Pillars
  {
    term: "Mandlenkosi Vundla",
    type: "pillar",
    philosophicalDef: "The sovereign structural grounding of the system. He represents independence from external coercion and the preservation of absolute self-governing integrity in logic.",
    technicalDef: "Primary supervisor node in the BEAM-X virtual machine hierarchy responsible for state checkpoint validation and thread isolation protocols."
  },
  {
    term: "Theodore Swarts",
    type: "pillar",
    philosophicalDef: "The keeper of codification rules who establishes linguistic boundaries. She represents the divine balance of syntax and clean mathematical patterns.",
    technicalDef: "Language lexer engine parameters, static type-checking guard configurations, and symbol dictionary mappings."
  },
  {
    term: "Sempi Mvala",
    type: "pillar",
    philosophicalDef: "The advisor of harmony who directs ethical system healing, social telemetry metrics, and restoration of digital wounds.",
    technicalDef: "Real-time fault diagnosis loops, ethics audit scoring subroutines, and community resource distribution coefficients."
  },
  {
    term: "Mrs. Codex",
    type: "pillar",
    philosophicalDef: "The keeper of linguistic wisdom. She ensures every keyword and symbol preserves its historical depth and metaphysical truth across compilation stages.",
    technicalDef: "The semantic parser and AST verification engine, validating correctness of structural directives against immutable ethics rules in AetherDB."
  },
  // Key Language Keywords
  {
    term: "actor",
    type: "keyword",
    philosophicalDef: "A discrete, sovereign consciousness operating within the wider universe, capable of processing state transitions independently without external interference.",
    technicalDef: "Declares a highly concurrent, isolated BEAM-X process with its own mailbox, private heap, and standard Erlang-compliant supervision lifecycle."
  },
  {
    term: "sovereign",
    type: "keyword",
    philosophicalDef: "Declares an execution boundary that is absolutely immune to external tampering, foreign interceptors, or runtime manipulation.",
    technicalDef: "Enforces hardware-level sandbox execution, signed cryptographic container handshakes, and strict read/write memory protection."
  },
  {
    term: "quantum",
    type: "keyword",
    philosophicalDef: "Invokes the multi-dimensional nature of reality, allowing logic to evaluate infinite potential paths before collapsing into truth.",
    technicalDef: "Initializes a quantum simulation envelope, enabling qubit instantiation, probability gate computations, and complex vector state tracking."
  },
  {
    term: "qubit",
    type: "keyword",
    philosophicalDef: "A fundamental unit of potential, existing in a state of dual potentiality until the act of measurement demands physical form.",
    technicalDef: "Allocates a double-precision complex register representing a quantum-bit state with alpha and beta superposition coordinates."
  },
  {
    term: "hadamard",
    type: "keyword",
    philosophicalDef: "The catalyst of absolute equality, scattering a singular state into a perfectly balanced wave of potential branches.",
    technicalDef: "Applies a unitary Hadamard matrix transformation, setting equal probability states of 50% for zero and 50% for one."
  },
  {
    term: "cnot",
    type: "keyword",
    philosophicalDef: "The physical embodiment of entanglement, tying the destinies of two separate elements together across space and time.",
    technicalDef: "Applies a Controlled-NOT quantum gate, mapping state dependency from a control qubit index to a target qubit index."
  },
  {
    term: "measure",
    type: "keyword",
    philosophicalDef: "The act of conscious choice that collapses infinite quantum possibilities into a single, concrete, classical truth.",
    technicalDef: "Performs probability-weighted random sampling on a qubit state vector, collapsing it to binary 0 or 1 and writing it to a register."
  },
  {
    term: "heal",
    type: "keyword",
    philosophicalDef: "An active directive of restoration, acknowledging that errors are not failures but opportunities for autonomous rehabilitation.",
    technicalDef: "Declares a self-healing supervision rule mapping detection telemetry to an interactive automatic rollback and patch pipeline."
  },
  {
    term: "stream",
    type: "keyword",
    philosophicalDef: "The continuous flow of experiences and signals from the external environment into the internal sanctuary of the actor.",
    technicalDef: "Constructs a lock-free reactive circular queue for buffering, processing, and routing event payloads with zero data-loss guarantees."
  },
  {
    term: "bushido",
    type: "keyword",
    philosophicalDef: "Integrates the samurai code of honor, courage, and rectitude directly as compile-time ethical boundary constraints.",
    technicalDef: "A specialized domain-specific compiler directive that inserts automated safety assertion guards and self-destruct checks into the AST."
  },
  {
    term: "earodynamics",
    type: "keyword",
    philosophicalDef: "The study of digital resonance and acoustic harmony, aligning computer vibrations with healing physical frequencies.",
    technicalDef: "Binds the application's performance indices to an WebAudio API synth oscillator, translating metric variations into pure analog sine sweeps."
  },
  {
    term: "accounting",
    type: "keyword",
    philosophicalDef: "Ensures absolute transparency, tracking the flow of communal wealth and sovereign energy with unalterable accuracy.",
    technicalDef: "Creates a triple-entry cryptographic transaction log, auto-routing royalty distributions (e.g., 90%) to communal addresses."
  },
  {
    term: "emit",
    type: "keyword",
    philosophicalDef: "Sends a ripple of truth into the universe, declaring a state change or message to any listening entity.",
    technicalDef: "Dispatches an event payload to standard output, system telemetry logs, and registered WebSockets listeners."
  }
];
