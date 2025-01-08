import React from "react";
import { cn } from "./utils/cn";

interface SelectProps {
	options: { value: string; label: string }[];
	className?: string;
	selectClassName?: string;
	labelClassName?: string;
	name?: string;
	id?: string;
	value?: string;
	onChange: (value: string) => void;
	disabled?: boolean;
	label?: string;
}

const Select: React.FC<SelectProps> = ({
	options,
	className = "",
	selectClassName = "",
	labelClassName = "",
	name = "",
	id = "",
	value,
	onChange,
	disabled = false,
	label,
}) => {
	return (
		<fieldset className={cn("flex items-center justify-between", className)}>
			{label && (
				<label
					htmlFor={id}
					className={cn(
						"break-all text-body1 !text-[11px]",
						"text-primary-900 dark:text-primary-900",
						labelClassName
					)}>
					{label}
				</label>
			)}
			<select
				name={name}
				id={id}
				className={cn(
					"text-body1 !text-[11px]",
					"text-primary-900 dark:text-primary-900",
					selectClassName
				)}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={disabled}>
				{options.map((option, i) => (
					<option value={option.value} key={i}>
						{option.label}
					</option>
				))}
			</select>
		</fieldset>
	);
};

export default Select;
