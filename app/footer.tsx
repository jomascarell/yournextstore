"use client";

import { Home, Lock, MessageCircle, Truck } from "lucide-react";
import Image from "next/image";
import { CtaSignUp } from "@/components/cta-sign-up";
import { Button } from "@/components/ui/button";
import { YnsLink } from "@/components/yns-link";

const trustItems = [
	{ icon: Lock, title: "Pago seguro", description: "Cifrado SSl · Stripe" },
	{ icon: MessageCircle, title: "Soporte real", description: "WhatsApp · Email" },
	{ icon: Truck, title: "Envío Gratis", description: "En pedidos desde 50€" },
	{ icon: Home, title: "Devolución en 30 días", description: "Sin costes, sin preguntas" },
];

const helpLinks = [
	{ label: "Envío", href: "/faq#envio" },
	{ label: "Devoluciones", href: "/faq#devoluciones" },
	{ label: "Preguntas frecuentes", href: "/faq" },
	{ label: "Guía de tallas", href: "/faq#tallas" },
	{ label: "Cuidado de productos", href: "/faq#cuidado" },
];

const socialLinks = [
	{ label: "WhatsApp", href: "#" },
	{ label: "Instagram", href: "#" },
	{ label: "Pinterest", href: "#" },
	{ label: "Email", href: "mailto:hola@yournextstore.com" },
];

const legalLinks = [
	{ label: "Política de privacidad", href: "/legal/privacy-policy" },
	{ label: "Política de cookies", href: "/legal/cookies" },
	{ label: "Términos de uso", href: "/legal/terms" },
];

const paymentMethods = [
	{ label: "Visa", src: "/visa.svg" },
	{ label: "Mastercard", src: "/mastercard.svg" },
	{ label: "Apple Pay", src: "/applepay.svg" },
	{ label: "Google Pay", src: "/googlepay.svg" },
	{ label: "PayPal", src: "/paypal.svg" },
];

export function Footer() {
	return (
		<footer className="dark bg-background text-foreground">
			<div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-20">
				{/* Trust bar */}
				<div className="grid grid-cols-2 gap-8 border-b border-border pb-12 sm:grid-cols-4 sm:gap-24">
					{trustItems.map((item) => {
						const Icon = item.icon;
						return (
							<div key={item.title} className="flex flex-col gap-3">
								<Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
								<h4 className="text-base font-normal text-foreground">{item.title}</h4>
								<p className="text-sm text-muted-foreground">{item.description}</p>
							</div>
						);
					})}
				</div>

				{/* Main 3-column section */}
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-24">
					{/* Col 1: Newsletter */}
					<div className="flex flex-col gap-4">
						<h2 className="text-xl font-normal text-foreground">Suscripción al boletín</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							Suscríbete para recibir ofertas exclusivas, historias originales, información sobre activismo,
							eventos y más.
						</p>
						<CtaSignUp buttonVariant="filled-transparent" />
					</div>

					{/* Col 2: Help links */}
					<div className="flex flex-col gap-4">
						<h2 className="text-xl font-normal text-foreground">Ayuda</h2>
						<div className="flex flex-wrap gap-2">
							{helpLinks.map((link) => (
								<Button key={link.href} variant="outline-white" size="sm" asChild>
									<YnsLink prefetch="eager" href={link.href}>
										{link.label}
									</YnsLink>
								</Button>
							))}
						</div>
					</div>

					{/* Col 3: Language / Social / Info */}
					<div className="flex flex-col gap-8">
						<div>
							<h2 className="text-xl font-normal text-foreground">Idioma (si aplica)</h2>
							<p className="mt-2 text-sm text-muted-foreground">ES/EUR</p>
						</div>
						<div>
							<h2 className="text-xl font-normal text-foreground">Conecta</h2>
							<ul className="mt-3 space-y-1.5">
								{socialLinks.map((link) => (
									<li key={link.label}>
										<YnsLink
											prefetch="eager"
											href={link.href}
											className="text-sm text-muted-foreground transition-colors hover:text-foreground"
										>
											{link.label}
										</YnsLink>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h2 className="text-xl font-normal text-foreground">Información</h2>
							<p className="mt-2 text-sm text-muted-foreground">Formas de pago aceptadas</p>
							<div className="mt-3 flex flex-wrap items-center gap-3">
								{paymentMethods.map((method) => (
									<Image
										key={method.label}
										src={method.src}
										alt={method.label}
										width={38}
										height={24}
										className="brightness-0 invert"
										style={{ width: "auto", maxWidth: "32px", height: "auto" }}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Bottom legal bar */}
				<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-6 text-xs text-muted-foreground">
					{legalLinks.map((link) => (
						<YnsLink
							key={link.href}
							prefetch="eager"
							href={link.href}
							className="transition-colors hover:text-foreground"
						>
							{link.label}
						</YnsLink>
					))}
					<span>&copy; {new Date().getFullYear()} Your Next Store, Inc. Todos los derechos reservados.</span>
				</div>
			</div>
		</footer>
	);
}
