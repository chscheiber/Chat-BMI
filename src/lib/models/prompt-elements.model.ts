type PromptElement = {
	element_name: string | null;
	element_key: string | null;
	[x: string | number | symbol]: unknown;
};

export type TextElement = PromptElement & {
	value?: string | null;
};

export type BoolElement = PromptElement & {
	value?: string | null;
};

export class PromptBuilder {
	public signifier = '';
	private promptId = -1;
	private promptTypeId = -1;
	public scenario?: string;
	public persona?: string;
	public outputFormat?: string;
	public context?: Record<string, string>;
	public dbQueries?: string[];

	constructor(data: Partial<PromptBuilder>) {
		Object.assign(this, data);
	}

	public static fromFormData(formData: FormData) {
		const obj: any = {};
		for (const key of formData.keys()) {
			const property = PromptKeyMap[key as PromptElementKey];
			if (property) obj[property] = formData.get(key);
		}
		return new PromptBuilder(obj);
	}
}

export type GenerationDirectives = {
	reasoning?: boolean;
	referencing?: boolean;
};

const PromptElementKeys = [
	'task_signifier',
	'scenario',
	'output_format',
	'persona',
	'reasoning',
	'referencing',
	'context',
	'db_queries'
] as const;

export type PromptElementKey = (typeof PromptElementKeys)[number];

const PromptKeyMap: Record<string, string> = {
	context: 'context',
	db_queries: 'dbQueries',
	output_format: 'outputFormat',
	persona: 'persona',
	reasoning: 'reasoning',
	referencing: 'referencing',
	scenario: 'scenario',
	task_signifier: 'signifier',
	promptId: 'promptId',
	promptTypeId: 'promptTypeId'
};
