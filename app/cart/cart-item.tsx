"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { removeFromCart, setCartQuantity } from "@/app/cart/actions";
import { type CartLineItem, getLineItemUnitPrice, useCart } from "@/app/cart/cart-context";
import { Button } from "@/components/ui/button";
import { YnsLink } from "@/components/yns-link";
import { CURRENCY, LOCALE } from "@/lib/constants";
import { formatMoney } from "@/lib/money";
import { cn, getProductThumbnail } from "@/lib/utils";
import { YNSMedia } from "@/lib/yns-media";

type CartItemProps = {
	item: CartLineItem;
};

export function CartItem({ item }: CartItemProps) {
	const router = useRouter();
	const { dispatch, closeCart } = useCart();
	const [isPending, startTransition] = useTransition();
	const [confirmDelete, setConfirmDelete] = useState(false);

	const { productVariant, quantity } = item;
	const { product } = productVariant;

	const image = getProductThumbnail(productVariant.images) ?? getProductThumbnail(product.images);
	const price = getLineItemUnitPrice(item);
	const lineTotal = price * BigInt(quantity);

	const categoryName = product.productCollections?.[0]?.collection.name;
	const variantSummary = productVariant.combinations
		?.map((c) => `${c.variantValue.variantType.label} ${c.variantValue.value}`)
		.join(" · ");

	const handleRemove = () => {
		startTransition(async () => {
			dispatch({ type: "REMOVE", variantId: productVariant.id });
			await removeFromCart(productVariant.id);
			router.refresh();
		});
		setConfirmDelete(false);
	};

	const handleIncrement = () => {
		startTransition(async () => {
			dispatch({ type: "INCREASE", variantId: productVariant.id });
			await setCartQuantity(productVariant.id, quantity + 1);
			router.refresh();
		});
	};

	const handleDecrement = () => {
		if (quantity <= 1) {
			setConfirmDelete(true);
			return;
		}
		startTransition(async () => {
			dispatch({ type: "DECREASE", variantId: productVariant.id });
			await setCartQuantity(productVariant.id, quantity - 1);
			router.refresh();
		});
	};

	return (
		<div className="flex gap-4 py-5">
			{/* Product Image */}
			<YnsLink
				prefetch={"eager"}
				href={`/product/${product.slug}`}
				onClick={closeCart}
				className="relative h-24 w-24 shrink-0 overflow-hidden bg-secondary"
			>
				{image && <YNSMedia src={image} alt={product.name} fill className="object-cover" sizes="96px" />}
			</YnsLink>

			{/* Product Details */}
			<div className="flex min-w-0 flex-1 flex-col justify-between">
				<div className="flex items-start justify-between gap-2">
					<div className="flex min-w-0 flex-col gap-1">
						<YnsLink
							prefetch={"eager"}
							href={`/product/${product.slug}`}
							onClick={closeCart}
							className="font-display text-base font-normal leading-tight text-foreground hover:underline line-clamp-2"
						>
							{product.name}
						</YnsLink>
						{(categoryName || variantSummary) && (
							<div className="flex flex-col font-sans text-xs text-muted-foreground">
								{categoryName && <span>{categoryName}</span>}
								{variantSummary && <span>{variantSummary}</span>}
							</div>
						)}
					</div>
					<button
						type="button"
						onClick={() => setConfirmDelete(true)}
						disabled={isPending}
						className="shrink-0 p-1 text-muted-foreground hover:text-destructive transition-colors disabled:pointer-events-none disabled:opacity-50"
						aria-label="Eliminar producto"
					>
						<Trash2 className="h-4 w-4" />
					</button>
				</div>

				{/* Delete confirmation */}
				{confirmDelete && (
					<div className="my-3 rounded-md border border-border bg-transparent p-3 text-sm">
						<p className="font-display text-base text-foreground">¿Eliminar este producto?</p>
						<p className="mt-1 font-sans text-xs text-muted-foreground">Podrás añadirlo de nuevo más tarde</p>
						<div className="mt-3 flex gap-2">
							<Button
								type="button"
								size="sm"
								onClick={handleRemove}
								disabled={isPending}
								className="flex-1 rounded-full font-display text-sm font-normal"
							>
								Sí, eliminar
							</Button>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => setConfirmDelete(false)}
								disabled={isPending}
								className="flex-1 rounded-full font-display text-sm font-normal border-destructive text-destructive hover:text-white hover:bg-destructive"
							>
								Cancelar
							</Button>
						</div>
					</div>
				)}

				<div className="flex items-end justify-between">
					{/* Quantity selector — rounded pill */}
					<div
						className={cn(
							"inline-flex items-center rounded-full border border-border bg-background transition-opacity",
							isPending && "opacity-50",
						)}
					>
						<button
							type="button"
							onClick={handleDecrement}
							disabled={isPending}
							className="shrink-0 flex h-7 w-7 items-center justify-center rounded-l-full hover:bg-secondary transition-colors disabled:pointer-events-none"
							aria-label="Disminuir cantidad"
						>
							<Minus className="h-3 w-3" />
						</button>
						<span className="flex h-7 min-w-8 items-center justify-center px-1 font-sans text-sm tabular-nums">
							{quantity}
						</span>
						<button
							type="button"
							onClick={handleIncrement}
							disabled={isPending}
							className="shrink-0 flex h-7 w-7 items-center justify-center rounded-r-full hover:bg-secondary transition-colors disabled:pointer-events-none"
							aria-label="Aumentar cantidad"
						>
							<Plus className="h-3 w-3" />
						</button>
					</div>

					{/* Price */}
					<span className="font-sans text-base font-semibold text-foreground">
						{formatMoney({ amount: lineTotal, currency: CURRENCY, locale: LOCALE })}
					</span>
				</div>
			</div>
		</div>
	);
}
