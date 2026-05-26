"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { addToCart } from "@/app/cart/actions";
import { useCart } from "@/app/cart/cart-context";
import { cn } from "@/lib/utils";

type VariantCombination = {
	variantValue: {
		id: string;
		value: string;
		colorValue: string | null;
		variantType: {
			id: string;
			type: "string" | "color";
			label: string;
		};
	};
};

export type CardVariant = {
	id: string;
	price: string;
	images: string[];
	combinations: VariantCombination[];
};

type CardProduct = {
	id: string;
	name: string;
	slug: string;
	images: string[];
};

type Props = {
	variants: CardVariant[];
	product: CardProduct;
};

type OptionGroup = {
	label: string;
	type: "string" | "color";
	options: { value: string; colorValue: string | null }[];
};

function buildGroups(variants: CardVariant[]): OptionGroup[] {
	const groups = new Map<string, OptionGroup>();
	const seen = new Map<string, Set<string>>();

	for (const variant of variants) {
		for (const { variantValue } of variant.combinations ?? []) {
			const { label, type } = variantValue.variantType;
			if (!groups.has(label)) {
				groups.set(label, { label, type, options: [] });
				seen.set(label, new Set());
			}
			const seenValues = seen.get(label);
			if (seenValues && !seenValues.has(variantValue.value)) {
				seenValues.add(variantValue.value);
				groups.get(label)?.options.push({
					value: variantValue.value,
					colorValue: variantValue.colorValue,
				});
			}
		}
	}

	return [...groups.values()];
}

export function ProductCardHoverOverlay({ variants, product }: Props) {
	const { openCart, dispatch } = useCart();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isSelecting, setIsSelecting] = useState(false);
	const [selected, setSelected] = useState<Record<string, string>>({});

	const groups = useMemo(() => buildGroups(variants), [variants]);
	const hasChoices = variants.length > 1 && groups.length > 0;
	const showSizeGuide = groups.some((g) => /talla|size/i.test(g.label));

	const resetSelector = () => {
		setIsSelecting(false);
		setSelected({});
	};

	const addVariant = (variant: CardVariant) => {
		openCart();
		startTransition(async () => {
			dispatch({
				type: "ADD_ITEM",
				item: {
					quantity: 1,
					productVariant: {
						id: variant.id,
						price: variant.price,
						images: variant.images.length > 0 ? variant.images : product.images,
						product: {
							id: product.id,
							name: product.name,
							slug: product.slug,
							images: product.images,
						},
					},
				},
			});
			await addToCart(variant.id, 1);
			resetSelector();
		});
	};

	const handleAddClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!hasChoices) {
			addVariant(variants[0]);
			return;
		}
		setIsSelecting(true);
	};

	const handleSelectOption = (e: React.MouseEvent, label: string, value: string) => {
		e.preventDefault();
		e.stopPropagation();

		const next = { ...selected, [label]: value };
		setSelected(next);

		if (Object.keys(next).length < groups.length) return;

		const match = variants.find((variant) =>
			variant.combinations.every((c) => next[c.variantValue.variantType.label] === c.variantValue.value),
		);
		if (match) {
			addVariant(match);
		}
	};

	if (variants.length === 0) return null;

	const selectorTitle =
		groups.length === 1 ? `Seleccionar ${groups[0].label.toLowerCase()}` : "Seleccionar opciones";

	return (
		<>
			{/* Step 1 — quick-buy button (revealed on hover) */}
			{!isSelecting && (
				<div className="absolute inset-x-0 bottom-0 flex translate-y-2 justify-center pb-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
					<button
						type="button"
						onClick={handleAddClick}
						disabled={isPending}
						className="pointer-events-none flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 group-hover:pointer-events-auto"
						aria-label={`Añadir ${product.name} a la cesta`}
					>
						{isPending ? "Añadiendo…" : "Añadir a la cesta"}
						<span className="flex h-5 w-5 items-center justify-center rounded-full border border-background/50">
							<Plus className="h-3 w-3" />
						</span>
					</button>
				</div>
			)}

			{/* Step 2 — inline variant selector (auto-adds once a full combination is chosen) */}
			{isSelecting && (
				<div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
					<div
						onMouseLeave={resetSelector}
						className="pointer-events-none rounded-lg bg-foreground/90 p-3 text-background backdrop-blur-sm group-hover:pointer-events-auto"
					>
						<div className="mb-2.5 flex items-center justify-between">
							<span className="text-[11px] font-medium uppercase tracking-widest">{selectorTitle}</span>
							{showSizeGuide && (
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										router.push(`/product/${product.slug}`);
									}}
									className="text-[11px] underline opacity-60 transition-opacity hover:opacity-100"
								>
									Guía de tallas
								</button>
							)}
						</div>

						<div className="flex flex-col gap-2.5">
							{groups.map((group) => (
								<div key={group.label}>
									{groups.length > 1 && (
										<span className="mb-1.5 block text-[10px] uppercase tracking-wide opacity-60">
											{group.label}
										</span>
									)}
									<div className="flex flex-wrap gap-1.5">
										{group.options.map((option) => {
											const isActive = selected[group.label] === option.value;
											if (group.type === "color") {
												return (
													<button
														key={option.value}
														type="button"
														onClick={(e) => handleSelectOption(e, group.label, option.value)}
														disabled={isPending}
														className={cn(
															"h-7 w-7 rounded-full border transition-all active:scale-90",
															isActive
																? "ring-2 ring-background ring-offset-1 ring-offset-foreground"
																: "border-background/30 hover:border-background",
														)}
														style={{ backgroundColor: option.colorValue ?? "#fff" }}
														aria-label={option.value}
														title={option.value}
													/>
												);
											}
											return (
												<button
													key={option.value}
													type="button"
													onClick={(e) => handleSelectOption(e, group.label, option.value)}
													disabled={isPending}
													className={cn(
														"flex min-w-[32px] items-center justify-center rounded px-2 py-1 text-xs font-medium transition-all active:scale-90",
														isActive
															? "bg-background text-foreground"
															: "bg-background/20 text-background hover:bg-background/40",
													)}
												>
													{option.value}
												</button>
											);
										})}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
