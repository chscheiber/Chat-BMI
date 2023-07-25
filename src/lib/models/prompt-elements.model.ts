type PromptElement = {
	element_name: string | null;
	[x: string | number | symbol]: unknown;
};

export type TextElement = PromptElement & {
	value?: string | null;
};

export type BoolElement = PromptElement & {
	value?: string | null;
};
