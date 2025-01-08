import {
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionItem,
} from "aspect-ui/Accordion";
import { Switch } from "aspect-ui/Switch";
// import { TabContent, TabItem, TabList, Tabs } from "aspect-ui/Tabs";
import React, { useState } from "react";
import Editor from "./Editor";
import { GlobalOptionsType, ItemOptionsType } from "./Global";
import IconSelector from "./icons/IconSelector";
import { cn } from "./utils/cn";
// import { cn } from "./utils/cn";

interface AccordionPreviewProps {
	globalOptions: GlobalOptionsType;
	items: ItemOptionsType[];
	className?: string;
	updateItem?: (index: number, key: string, value: string) => void;
	quickView?: boolean;
}

const AccordionPreview: React.FC<AccordionPreviewProps> = ({
	globalOptions,
	items,
	className,
	updateItem,
	quickView = false,
}) => {
	console.log(items);
	// Determine active items based on global options
	const activeItems =
		globalOptions?.activeItems?.map((index) => `item-${index + 1}`) || [];

	const [preview, setPreview] = useState(false);
	// const [tabActive, setTabActive] = useState(
	// 	globalOptions.tabsDefaultActive
	// 		? `item-${globalOptions.tabsDefaultActive + 1}`
	// 		: "item-1"
	// );

	return (
		<div className={`accordion-preview font-poppins ${className}`}>
			<div className="flex items-center justify-between">
				<h3>Accordion Preview</h3>
				{!quickView && (
					<Switch
						checked={preview}
						onChange={(value) => setPreview(value)}
						label="Preview?"
						labelClassName="text-[11px] ml-0 text-primary-900 dark:text-primary-900"
						className="flex-row-reverse justify-between"
					/>
				)}
			</div>
			{globalOptions.isAccordion && (
				<Accordion
					activeItem={activeItems}
					iconEnabled={globalOptions.iconEnabled}
					iconPosition={globalOptions.iconPosition}
					className={`${globalOptions.accordionClassName} ${quickView ? "w-full max-w-[600px]" : ""}`}
					reset={true}>
					{items.map((item, index) => {
						return (
							<AccordionItem
								key={index}
								id={`item-${index + 1}`}
								disabled={item.disabled === true ? true : false}>
								<AccordionHeader
									iconEnabled={item.iconEnabled ? item.iconEnabled : globalOptions.iconEnabled}
									iconPosition={item.iconPosition ? item.iconPosition : globalOptions.iconPosition}
									iconClassName={cn(globalOptions.inactiveIconClassName, item.iconClassName)}
									activeIconClassName={cn(globalOptions.activeIconClassName, item.activeIconClassName)}
									activeIcon={
										item.activeIcon.length > 0 ? (
											<IconSelector
												iconType={item.activeIconType}
												iconName={item.activeIcon}
											/>
										) : (
											<IconSelector
												iconType={globalOptions.activeIconType}
												iconName={globalOptions.activeIcon}
											/>
										)
									}
									inactiveIcon={
										item.inactiveIcon.length > 0 ? (
											<IconSelector
												iconType={item.inactiveIconType}
												iconName={item.inactiveIcon}
											/>
										) : (
											<IconSelector
												iconType={globalOptions.inactiveIconType}
												iconName={globalOptions.inactiveIcon}
											/>
										)
									}
									className={cn(globalOptions.headerClassName, item.headerClassName)}
									labelClassName={cn(globalOptions.labelClassName, item.labelClassName)}
									activeHeaderClassName={cn(globalOptions.activeHeaderClassName, item.activeHeaderClassName)}
									activeLabelClassName={cn(globalOptions.activeLabelClassName, item.activeLabelClassName)}>
									{item.headerLabel}
								</AccordionHeader>

								{/* <AccordionContent
								className={item.contentClassName}
								dangerouslySetInnerHTML={{
									__html: qs.unescape(item.content),
								}}
							/> */}

								{!quickView && (
									<AccordionContent className={item.contentClassName}>
										{preview ? (
											<div dangerouslySetInnerHTML={{ __html: item.content }} />
										) : (
											<Editor
												value={item.content || ""}
												onChange={(value) =>
													updateItem && updateItem(index, "content", value)
												}
											/>
										)}
									</AccordionContent>
								)}
								{quickView && (
									<AccordionContent
										className={item.contentClassName}
									>
										<div dangerouslySetInnerHTML={{ __html: item.content }} />
									</AccordionContent>
								)}
								{/* <AccordionContent
								className={item.contentClassName}
								dangerouslySetInnerHTML={{ __html: item.content }}
							/> */}
							</AccordionItem>
						);
					})}
				</Accordion>
			)}
			{/* {!globalOptions.isAccordion && (
				<Tabs
					defaultActive={`item-${globalOptions.tabsDefaultActive + 1}`}
					className={globalOptions.tabsClassName}>
					<TabList className={globalOptions.tabsListClassName}>
						{items.map((item, index) => {
							console.log("disabled", item.disabled);
							return (
								<TabItem
									key={index}
									id={`item-${index + 1}`}
									className={cn(
										"flex items-center space-x-2",
										globalOptions.headerClassName,
										globalOptions.activeHeaderClassName,
										item.headerClassName,
										item.activeHeaderClassName
									)}
									disabled={item.disabled === true ? true : false}
									onClick={() => {
										if (item.disabled === true) return;
										setTabActive(`item-${index + 1}`);
									}}>
									{globalOptions?.iconEnabled &&
										item.iconEnabled &&
										(item.iconPosition === "left" ||
											(item.iconPosition === "" &&
												globalOptions.iconPosition === "left")) && (
											<IconSelector
												iconType={
													tabActive === `item-${index + 1}`
														? item.activeIconType ||
														globalOptions.activeIconType
														: item.inactiveIconType ||
														globalOptions.inactiveIconType
												}
												iconName={
													tabActive === `item-${index + 1}`
														? item.activeIcon || globalOptions.activeIcon
														: item.inactiveIcon || globalOptions.inactiveIcon
												}
												className={cn(
													"size-5",
													globalOptions.iconClassName,
													tabActive === `item-${index + 1}`
														? globalOptions.activeIconClassName
														: globalOptions.inactiveIconClassName,
													item.iconClassName,
													tabActive === `item-${index + 1}`
														? item.activeIconClassName
														: item.inactiveIconClassName
												)}
											/>
										)}

									<span
										className={cn(
											globalOptions.labelClassName,
											globalOptions.activeLabelClassName,
											item.labelClassName,
											item.activeLabelClassName
										)}>
										{item.headerLabel}
									</span>

									{globalOptions?.iconEnabled &&
										item.iconEnabled &&
										(item.iconPosition === "right" ||
											(item.iconPosition === "" &&
												globalOptions.iconPosition === "right")) && (
											<IconSelector
												iconType={
													tabActive === `item-${index + 1}`
														? item.activeIconType ||
														globalOptions.activeIconType
														: item.inactiveIconType ||
														globalOptions.inactiveIconType
												}
												iconName={
													tabActive === `item-${index + 1}`
														? item.activeIcon || globalOptions.activeIcon
														: item.inactiveIcon || globalOptions.inactiveIcon
												}
												className={cn(
													"size-5",
													globalOptions.iconClassName,
													tabActive === `item-${index + 1}`
														? globalOptions.activeIconClassName
														: globalOptions.inactiveIconClassName,
													item.iconClassName,
													tabActive === `item-${index + 1}`
														? item.activeIconClassName
														: item.inactiveIconClassName
												)}
											/>
										)}
								</TabItem>
							);
						})}
					</TabList>
					{items.map((item, index) => (
						<TabContent
							key={index}
							className={cn(
								globalOptions.contentClassName,
								item.contentClassName
							)}
							id={`item-${index + 1}`}>
							<div dangerouslySetInnerHTML={{ __html: item.content }} />
						</TabContent>
					))}
				</Tabs>
			)} */}
		</div>
	);
};

export default AccordionPreview;
