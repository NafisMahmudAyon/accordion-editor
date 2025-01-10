import React, { useMemo } from "react";
import iconsListOutline from "./IconListOutline";
import iconsListSolid from "./IconListSolid";

interface IconSelectorProps{
	iconType: string;
	iconName: string;
	className?: string
}

const IconSelector: React.FC<IconSelectorProps> = ({ iconType, iconName, className = "", ...rest }) => {
	// Determine the icon list based on the type
	const iconList = useMemo(
		() => (iconType === "solid" ? iconsListSolid : iconsListOutline),
		[iconType]
	);

	// Map icon names to their components
	const iconMap = useMemo(
		() => Object.fromEntries(iconList.map((item) => [item.name, item.icon])),
		[iconList]
	);

	// Select the icon component
	const SelectedIcon = iconMap[iconName] || null;

	return SelectedIcon ? <SelectedIcon className={className} {...rest} /> : null;
};

export default IconSelector;
