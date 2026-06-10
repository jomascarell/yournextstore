"use client";

import { Truck } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/app/cart/cart-context";
import { CartItem } from "@/app/cart/cart-item";
import { CheckoutTrustLayer } from "@/components/checkout-trust-layer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CURRENCY, LOCALE } from "@/lib/constants";
import { formatMoney } from "@/lib/money";

const FREE_SHIPPING_THRESHOLD = BigInt(5000); // 50€ en céntimos
const SHIPPING_GREEN = "rgb(45,106,79)";
const SHIPPING_BG = "rgb(216,243,220)";

export function CartSidebar() {
	const { isOpen, closeCart, items, itemCount, subtotal } = useCart();

	const checkoutUrl = `/checkout`;
	const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
	const progress = Math.min(Number((subtotal * BigInt(100)) / FREE_SHIPPING_THRESHOLD), 100);
	const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
			<SheetContent aria-describedby={undefined} className="flex flex-col w-full sm:max-w-lg gap-0">
				{/* Header */}
				<SheetHeader className="flex-none px-4 pt-12 pb-6">
					<SheetTitle className="font-display text-2xl font-normal leading-none text-foreground">
						Cesta
						{itemCount > 0 && (
							<span className="font-display text-2xl font-normal text-foreground"> ({itemCount})</span>
						)}
					</SheetTitle>
				</SheetHeader>

				{items.length === 0 ? (
					/* Empty cart */
					<div className="flex-1 flex flex-col justify-between overflow-hidden">
						<div className="flex flex-col gap-12 px-6 pt-6">
							<h2 className="text-4xl font-normal leading-none text-foreground">
								Tu cesta está vacía.
								<br />
								¿No sabes por dónde empezar?
							</h2>
							<div className="flex flex-col gap-3 w-full items-center">
								<Button
									onClick={closeCart}
									asChild
									className="w-sm rounded-full font-display text-base font-normal"
								>
									<a href="/products">Ver novedades</a>
								</Button>
								<Button
									variant="link"
									onClick={closeCart}
									className="w-full font-display text-base font-normal"
								>
									Seguir comprando
								</Button>
							</div>
						</div>
						<div className="relative flex-1 min-h-0 mt-12">
							<Image
								src="/images/images-cart-sidebar/Rocher_PaulaEscribano02.jpg"
								alt=""
								fill
								sizes="(max-width: 640px) 100vw, 512px"
								className="object-cover object-top"
								aria-hidden="true"
							/>
						</div>
					</div>
				) : (
					<>
						{/* Free shipping progress */}
						<div className="flex-none px-4 pt-2 pb-4">
							<div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
								<div
									className="h-full rounded-full bg-foreground transition-all duration-500"
									style={{ width: `${progress}%` }}
								/>
							</div>
							{hasFreeShipping ? (
								<div className="mt-3 flex w-full items-center justify-center gap-2 rounded-full px-3 py-2">
									<Truck className="h-4 w-4 shrink-0" style={{ color: SHIPPING_GREEN }} />
									<span className="font-sans text-sm font-bold" style={{ color: SHIPPING_GREEN }}>
										¡Enhorabuena! Tienes envío gratuito.
									</span>
								</div>
							) : (
								<p className="mt-2 text-center font-sans text-sm text-foreground">
									Te faltan{" "}
									<span className="font-semibold">
										{formatMoney({ amount: remaining, currency: CURRENCY, locale: LOCALE })}
									</span>{" "}
									para conseguir el envío gratis
								</p>
							)}
						</div>

						{/* Cart items */}
						<ScrollArea className="min-h-0 flex-1 px-4">
							<div className="divide-y divide-border">
								{items.map((item) => (
									<CartItem key={item.productVariant.id} item={item} />
								))}
							</div>
						</ScrollArea>

						{/* Footer */}
						<SheetFooter className="flex-none gap-5 border-t border-border px-4 py-4">
							{/* Subtotal */}
							<div className="flex items-center justify-between">
								<span className="font-sans text-sm text-muted-foreground">Subtotal</span>
								<span className="font-sans text-base font-bold text-foreground">
									{formatMoney({ amount: subtotal, currency: CURRENCY, locale: LOCALE })}
								</span>
							</div>

							{/* Shipping — border-bottom separates from total */}
							<div className="flex items-center justify-between border-b border-border pb-4">
								<span className="font-sans text-sm text-muted-foreground">Envío</span>
								<span className="font-sans text-sm text-muted-foreground">Calculado en el checkout</span>
							</div>

							{/* Total */}
							<div className="flex items-center justify-between">
								<span className="font-sans text-sm font-semibold text-foreground">Total estimado</span>
								<span className="font-sans text-base font-bold text-foreground">
									{formatMoney({ amount: subtotal, currency: CURRENCY, locale: LOCALE })}
								</span>
							</div>

							{/* Trust bar */}
							<CheckoutTrustLayer />

							{/* CTA buttons */}
							<div className="flex flex-col gap-2">
								<Button
									asChild
									className="w-full rounded-none font-display text-base font-normal py-4 px-6 gap-3"
								>
									<a href={checkoutUrl}>
										<span>Pagar ahora</span>
										<span className="font-regular">
											{formatMoney({ amount: subtotal, currency: CURRENCY, locale: LOCALE })}
										</span>
									</a>
								</Button>
								<Button
									variant="link"
									onClick={closeCart}
									className="w-full h-8 font-display text-base font-normal underline underline-offset-4"
								>
									Seguir comprando
								</Button>
							</div>
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
