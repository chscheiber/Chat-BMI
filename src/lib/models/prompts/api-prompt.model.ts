import type { AnalyticalPrompt } from './analytical-prompt.model';
import type { BrainstormingPrompt } from './brainstorming-prompt.model';
import type { DesignPrompt } from './design-prompt.model';
import type { FreeFormPrompt } from './free-form-prompt.model';
import type { Prompt } from './prompt.model';

export type ApiPrompt = Prompt & {
	persona?: string;
	scenario?: string;
	reasoning?: boolean;
	referencing?: boolean;
	db_queries?: string[];
	type: AnalyticalPrompt | BrainstormingPrompt | DesignPrompt | FreeFormPrompt;
};

export type LlmSettings = {
	key: string;
	model: string;
	streaming: boolean;
};
