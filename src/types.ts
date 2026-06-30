export interface Token {
  type: string;
  value: string;
  line: number;
}

export interface CompilationResult {
  success: boolean;
  tokens: Token[];
  ast: {
    type: string;
    body: any[];
  };
  verification: {
    status: string;
    assertionsProved: string[];
    ethicsCompliance: string;
    errors: string[];
  };
  bytecode: string;
}

export interface FaultStep {
  stage: "DETECTION" | "DIAGNOSIS" | "REPAIR" | "VERIFICATION" | "RECOVERY";
  action: string;
  duration: number;
  status: string;
}

export interface CodeTemplate {
  name: string;
  description: string;
  domain: string;
  code: string;
}
