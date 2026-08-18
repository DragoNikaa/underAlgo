import type { Category } from "./category.ts";
import type { Difficulty } from "./difficulty.ts";
import type { TestCase } from "./test-case.ts";

export interface AlgorithmListItem {
  links: {
    self: string;
  };
  name: string;
  slug: string;
  general_description: string;
  difficulty: Difficulty;
  categories: Category[];
}

export interface AlgorithmDetail {
  actions: {
    execute: {
      href: string;
      method: string;
      fields: string[];
    };
  };
  name: string;
  slug: string;
  general_description: string;
  input_description: Record<string, string>;
  output_description: string;
  code: string[];
  difficulty: Difficulty;
  categories: Category[];
  test_cases: TestCase[];
}

export interface AlgorithmExecution {
  steps: Step[];
  output: unknown;
}

interface Step {
  line: number;
  explanation: string;
  changed_variables: string[];
  variables: Record<string, unknown>;
}
