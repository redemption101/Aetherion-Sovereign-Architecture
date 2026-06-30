import { CodeTemplate } from "./types";

export const CODE_TEMPLATES: CodeTemplate[] = [
  {
    name: "1. Hello Sovereign Universe",
    description: "An intro program that spawns a sovereign greeting, standard classical computing combined with quantum probability branches.",
    domain: "Philosophy & Quantum",
    code: `// Aetherion Sovereign Edition v3.0
// Mandlenkosi Vundla, Theodore Swarts, Mrs. Codex, Sempi Mvala

actor hello_world_hub {
  sovereign context sovereign_greeting {
    emit "Hello, Aetherion Sovereign Universe!";
  }
  
  quantum circuit greeting_probability {
    qubit q0;
    hadamard q0; // Put qubit into equal superposition
    measure q0 -> register;
    
    if register == 1 {
      emit "Ascending to Quantum Realm — Harmony is achieved!";
    } else {
      emit "Anchoring in Classical Domain — Stability established.";
    }
  }
}
`
  },
  {
    name: "2. Quantum Bell Entanglement",
    description: "Demonstrates quantum physics domain by creating and measuring a Bell pair state (highly correlated qubits).",
    domain: "Quantum Physics",
    code: `// Quantum-Classical Hybrid Algorithm
// Proves perfect correlation using native gates

quantum circuit bell_entanglement {
  qubit q0, q1;
  
  // Apply Hadamard to first qubit to create superposition
  hadamard q0;
  
  // Entangle q0 and q1 with a Controlled-NOT gate
  cnot q0, q1;
  
  // Collapse and measure to classical registers
  measure q0 -> m0;
  measure q1 -> m1;
  
  function evaluate_entanglement() {
    if m0 == m1 {
      emit "Perfect correlation detected: Qubits are securely entangled!";
    } else {
      emit "Quantum decoherence detected. Emergency self-healing requested.";
    }
  }
}
`
  },
  {
    name: "3. Self-Healing Microservices",
    description: "Models a critical aerospace telemetry node protected by the 'heal' directive and exponential backoff retry algorithms.",
    domain: "Resilience & self-healing",
    code: `// Aerospace Flight Control Telemetry Sync
// Implements self-healing and recovery guards

actor telemetry_agent {
  stream sensor_inputs -> diagnostic_analyzer;
  
  heal autonomous_recovery {
    monitor {
      health_checks -> system_status;
      cpu_load -> core_health;
      error_logs -> anomaly_patterns;
    }
    
    diagnose {
      root_cause_analysis;
      impact_score;
    }
    
    repair {
      hot_patch;
      automatic_rollback;
      retry(3) with exponential_backoff;
    }
    
    verify {
      state_coherence_check;
      integrity_audit;
    }
  }
  
  function check_aerospace_orbit() {
    if system_status == "DEGRADED" {
      trigger_heal autonomous_recovery;
    }
  }
}
`
  },
  {
    name: "4. Sun Tzu Cyber Security Shield",
    description: "Defends against intrusion using Bushido Code virtue systems like Rectitude (Gi) and Honor self-destruction protocols (Meiyo).",
    domain: "Cybersecurity & Strategy",
    code: `// Sun Tzu & Samurai Cyber Shield
// Implements Bushido active threat neutralizing 

actor threat_neutralizer {
  sovereign context defense_perimeter {
    monitor security_events -> threat_intelligence;
  }
  
  bushido active_shield {
    rectitude (Gi) {
      evaluate_proportional_response;
      block_offending_ip_instantly;
    }
    
    courage (Yuki) {
      neutralize_intruder_connections;
      isolate_infected_pods;
    }
    
    honesty (Makoto) {
      write_immutable_audit_log -> AetherDB;
    }
    
    honor (Meiyo) {
      if compromise_is_irreversible {
        trigger_self_destruct_protocol; // Contain data leak
      }
    }
  }
}
`
  },
  {
    name: "5. Earodynamics Acoustic Resonance",
    description: "Studies sound propagation and damping models. Press 'Synthesize' to audibly generate the exact sonic sweep mapped here!",
    domain: "Earodynamics",
    code: `// Earodynamics sound & vibration simulation
// Modeled by Advisor of Harmony, Sempi Mvala

earodynamics acoustics sonic_sweep {
  function compute_damping(frequency, damp_factor) {
    wave_propagation = frequency * e^(-damp_factor);
    return wave_propagation;
  }
  
  // Audibly play resonance frequency sweep
  stream wave_frequency -> synth_oscillator;
  
  emit "Earodynamics sweep initialized. Calibrating to 528Hz healing Solfeggio.";
}
`
  },
  {
    name: "6. Triple-Entry Sovereign Ledger",
    description: "A secure financial ledger distributing 90% royalties automatically to the Sparrow Rainbow Village.",
    domain: "Business & Economics",
    code: `// Sovereign Accounting Ledger with Auto-Taxation
// Preserves economic rights of community centers

accounting double_entry financial_ledger {
  function record_wealth_distribution(gross_value) {
    sparrow_rainbow_village_share = gross_value * 0.90;
    development_reserve_share = gross_value * 0.10;
    
    journal_entry(
      debit: cash_account,
      credit: Sparrow_Rainbow_Village, 
      amount: sparrow_rainbow_village_share
    );
    
    journal_entry(
      debit: cash_account,
      credit: general_development_fund,
      amount: development_reserve_share
    );
    
    emit "90% sovereign revenue securely allocated to Sparrow Rainbow Village.";
  }
}
`
  }
];
