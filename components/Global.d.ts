export interface GlobalOptionsType {
	multiple: boolean;
	activeIcon: string;
	isVertical: boolean;
	activeItems: number[];
	iconEnabled: boolean;
	isAccordion: boolean;
	iconPosition: "right" | "left" | undefined;
	inactiveIcon: string;
	tabsClassName: string;
	activeIconType: string;
	labelClassName: string;
	headerClassName: string;
	contentClassName: string;
	inactiveIconType: string;
	tabsDefaultActive: number;
	accordionClassName: string;
	tabsLabelClassName: string;
	activeIconClassName: string;
	activeLabelClassName: string;
	activeHeaderClassName: string;
	inactiveIconClassName: string;
}

export interface ItemOptionsType {
	id: string;
	content: string;
	disabled: boolean;
	activeIcon: string;
	headerLabel: string;
	iconEnabled: boolean;
	iconPosition: "right" | "left" | undefined;
	inactiveIcon: string;
	iconClassName: string;
	activeIconType: string;
	labelClassName: string;
	headerClassName: string;
	contentClassName: string;
	inactiveIconType: string;
	accordionClassName: string;
	activeIconClassName: string;
	navigationClassName: string;
	activeLabelClassName: string;
	activeHeaderClassName: string;
}

export interface AccordionData {
	global: GlobalOptionsType;
	items: ItemOptionsType[];
}

export interface AccordionsData {
	id: number;
	created_at: string;
	user_id: string;
	status: "publish" | "draft" | "trash";
	title: string;
	content: AccordionData;
}