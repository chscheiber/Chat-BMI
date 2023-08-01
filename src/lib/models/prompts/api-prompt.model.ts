import type { AnalyticalPrompt } from './analytical-prompt.model';
import type { BrainstormingPrompt } from './brainstorming-prompt.model';
import type { DesignPrompt } from './design-prompt.model';
import type { FreeFormPrompt } from './free-form-prompt.model';
import type { Prompt } from './prompt.model';

export type ApiPrompt = Prompt & {
	persona?: string;
	scenario?: string;
	type: AnalyticalPrompt | BrainstormingPrompt | DesignPrompt | FreeFormPrompt;
};
