"use client";

import { ShoppingBag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { addToCart } from "@/app/cart/actions";
import { useCart } from "@/app/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { YNSMedia } from "@/lib/yns-media";

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
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<Record<string, string>>({});

	const groups = useMemo(() => buildGroups(variants), [variants]);
	const hasChoices = variants.length > 1 && groups.length > 0;

	const closeModal = () => {
		setIsOpen(false);
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
			closeModal();
		});
	};

	const handleAddClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!hasChoices) {
			const first = variants[0];
			if (first) addVariant(first);
			return;
		}
		setIsOpen(true);
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

	const modalImage = variants[0]?.images[0] ?? product.images[0];

	return (
		<>
			<div className="absolute inset-x-0 bottom-0 pt-3 pb-3 flex translate-y-2 flex-row items-center justify-end gap-2 opacity-0 pointer-events-none transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto motion-reduce:transition-none motion-reduce:translate-y-0">
				<Button
					type="button"
					onClick={handleAddClick}
					disabled={isPending}
					className="rounded-none h-auto w-auto p-5"
					aria-label={`Añadir ${product.name} a la cesta`}
				>
					<ShoppingBag className="size-5" />
				</Button>
			</div>

			<div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
				<Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
					<DialogContent
						showCloseButton={false}
						className="sm:max-w-3xl gap-0 p-0 border-0 rounded-none overflow-hidden"
					>
						<DialogTitle className="sr-only">{`Seleccionar opciones para ${product.name}`}</DialogTitle>

						<button
							type="button"
							onClick={closeModal}
							className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center text-foreground transition-opacity hover:opacity-70"
							aria-label="Cerrar"
						>
							<X className="size-6" />
						</button>

						<div className="grid grid-cols-2">
							<div className="relative aspect-square bg-secondary">
								{modalImage && (
									<YNSMedia
										src={modalImage}
										alt={product.name}
										fill
										sizes="(max-width: 768px) 50vw, 384px"
										className="object-cover"
									/>
								)}
							</div>

							<div className="flex flex-col p-8 pt-12">
								<div className="mb-6 flex items-start justify-between gap-4">
									<h4 className="font-display text-2xl font-normal leading-none text-foreground">
										{product.name}
									</h4>
									<button
										type="button"
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											closeModal();
											router.push(`/product/${product.slug}`);
										}}
										className="whitespace-nowrap font-sans text-sm text-foreground underline transition-opacity hover:opacity-70"
									>
										Consultar producto
									</button>
								</div>

								<div className="flex flex-col">
									{groups.map((group) =>
										group.options.map((option) => {
											const isActive = selected[group.label] === option.value;
											return (
												<button
													key={`${group.label}-${option.value}`}
													type="button"
													onClick={(e) => handleSelectOption(e, group.label, option.value)}
													disabled={isPending}
													className={cn(
														"flex items-center justify-start border-t border-border py-4 text-left font-sans text-base text-foreground transition-colors hover:bg-secondary/60 disabled:opacity-60",
														isActive && "bg-secondary",
													)}
												>
													{option.value}
												</button>
											);
										}),
									)}
								</div>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
}
