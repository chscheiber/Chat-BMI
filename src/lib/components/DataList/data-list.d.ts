export type DataListItem = {
	title: string;
	subtitle: string;
	href?: string;
	image?: string;
};

export type DataListSettings = {
	title: string;
	elementNames: string;
	add?: DlCrud;
	delete?: DlCrud;
};

type DlCrud = {
	allow: boolean;
	path: string;
};
