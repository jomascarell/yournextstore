"use client";

import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
	quantity: number;
	onQuantityChange: (quantity: number) => void;
	min?: number;
	max?: number;
	disabled?: boolean;
};

export function QuantitySelector({
	quantity,
	onQuantityChange,
	min = 1,
	max = 99,
	disabled = false,
}: QuantitySelectorProps) {
	return (
		<div>
			<span className="mb-2 block font-sans text-base text-foreground">Cantidad</span>
			<div className="inline-flex h-[42px] items-center border-[0.5px] border-[rgb(53,54,53)]">
				<button
					type="button"
					className="flex h-full w-10 items-center justify-center text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
					onClick={() => onQuantityChange(Math.max(min, quantity - 1))}
					disabled={disabled || quantity <= min}
					aria-label="Decrease quantity"
				>
					<Minus className="h-3.5 w-3.5" />
				</button>
				<span className="flex h-full w-10 items-center justify-center font-sans text-base text-foreground">
					{quantity}
				</span>
				<button
					type="button"
					className="flex h-full w-10 items-center justify-center text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
					onClick={() => onQuantityChange(Math.min(max, quantity + 1))}
					disabled={disabled || quantity >= max}
					aria-label="Increase quantity"
				>
					<Plus className="h-3.5 w-3.5" />
				</button>
			</div>
		</div>
	);
}
