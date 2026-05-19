"use client";

import { Lock } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/app/cart/cart-context";
import { CartItem } from "@/app/cart/cart-item";
import { CheckoutTrustLayer } from "@/components/checkout-trust-layer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CURRENCY, LOCALE } from "@/lib/constants";
import { formatMoney } from "@/lib/money";

const FREE_SHIPPING_THRESHOLD = BigInt(8000); // 80€ en céntimos

export function CartSidebar() {
	const { isOpen, closeCart, items, itemCount, subtotal } = useCart();

	const checkoutUrl = `/checkout`;

	const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
	const progress = Math.min(Number((subtotal * BigInt(100)) / FREE_SHIPPING_THRESHOLD), 100);
	const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
			<SheetContent aria-describedby={undefined} className="flex flex-col w-full sm:max-w-lg">
				<SheetHeader className="border-b border-border pb-4">
					<SheetTitle className="flex items-center gap-2">
						Tu carrito
						{itemCount > 0 && (
							<span className="text-sm font-normal text-muted-foreground">({itemCount} productos)</span>
						)}
					</SheetTitle>
				</SheetHeader>

				{items.length === 0 ? (
					<div className="flex-1 flex flex-col justify-between overflow-hidden">
						<div className="flex flex-col gap-6 pt-24 px-10">
							<h2 className="text-5xl font-normal leading-none text-foreground">
								Tu cesta está vacía.
								<br />
								¿No sabes por dónde empezar?
							</h2>
							<div className="flex flex-col gap-2 w-full">
								<Button onClick={closeCart} asChild className="w-full rounded-full">
									<a href="/products">Ver novedades</a>
								</Button>
								<Button variant="outline" onClick={closeCart} asChild className="w-full rounded-full">
									<a href="/collection">Ver todas las colecciones</a>
								</Button>
							</div>
						</div>
						<div className="relative flex-1 min-h-0 mt-14">
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
						{/* Barra de progreso envío gratis */}
						<div className="px-4 pt-4 pb-2">
							{hasFreeShipping ? (
								<p className="text-xs text-center font-medium text-green-700">🎉 ¡Tienes envío gratuito!</p>
							) : (
								<p className="text-xs text-center text-muted-foreground">
									Te faltan{" "}
									<span className="font-semibold text-foreground">
										{formatMoney({ amount: remaining, currency: CURRENCY, locale: LOCALE })}
									</span>{" "}
									para envío gratis
								</p>
							)}
							<div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
								<div
									className="h-full rounded-full bg-foreground transition-all duration-500"
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>

						<ScrollArea className="flex-1 px-4">
							<div className="divide-y divide-border">
								{items.map((item) => (
									<CartItem key={item.productVariant.id} item={item} />
								))}
							</div>
						</ScrollArea>

						<SheetFooter className="border-t border-border pt-4 mt-auto">
							<div className="w-full space-y-3">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Subtotal</span>
									<span className="font-semibold">
										{formatMoney({ amount: subtotal, currency: CURRENCY, locale: LOCALE })}
									</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Envío</span>
									<span className="text-muted-foreground">Calculado en el checkout</span>
								</div>
								<div className="flex items-center justify-between text-base font-semibold border-t border-border pt-3">
									<span>Total estimado</span>
									<span>{formatMoney({ amount: subtotal, currency: CURRENCY, locale: LOCALE })}</span>
								</div>

								<CheckoutTrustLayer />
								<Button asChild className="w-full h-12 text-base font-medium">
									<a href={checkoutUrl}>
										<Lock className="h-4 w-4 mr-2" />
										Pagar de forma segura
									</a>
								</Button>

								{!hasFreeShipping && (
									<p className="text-xs text-center text-muted-foreground">
										Envío gratis a partir de{" "}
										{formatMoney({ amount: FREE_SHIPPING_THRESHOLD, currency: CURRENCY, locale: LOCALE })}
									</p>
								)}
								<button
									type="button"
									onClick={closeCart}
									className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
								>
									Seguir comprando
								</button>
							</div>
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
