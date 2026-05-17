"use client";

import { useActionState } from "react";
import { subscribeToNewsletter } from "@/app/newsletter/action";
import { TrustBar } from "@/components/trust-bar";
import { YnsLink } from "@/components/yns-link";

const helpLinks = [
	{ label: "Envío", href: "/faq#envio" },
	{ label: "Devoluciones", href: "/faq#devoluciones" },
	{ label: "Preguntas frecuentes", href: "/faq" },
	{ label: "Guía de tallas", href: "/faq#tallas" },
	{ label: "Cuidado de productos", href: "/faq#cuidado" },
	{ label: "Formulario de contacto", href: "/contact" },
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

const paymentMethods = ["Visa", "Mastercard", "Apple Pay", "Google Pay", "PayPal"];

function NewsletterForm() {
	const [state, action, isPending] = useActionState(subscribeToNewsletter, null);

	if (state?.success) {
		return <p className="mt-4 text-sm text-muted-foreground">¡Gracias! Te hemos añadido a la lista.</p>;
	}

	return (
		<form action={action} className="mt-4 flex flex-col gap-3">
			<div className="flex gap-2">
				<input
					type="email"
					name="email"
					placeholder="Correo electrónico *"
					required
					className="h-10 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20"
				/>
				<button
					type="submit"
					disabled={isPending}
					className="h-10 shrink-0 rounded-md border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
				>
					{isPending ? "…" : "Sign in"}
				</button>
			</div>
			{state?.error && <p className="text-xs text-red-500">{state.error}</p>}
			<p className="text-xs text-muted-foreground leading-relaxed">
				Al hacer clic en el botón «Suscribirme», doy mi consentimiento a Your Next Store para el tratamiento
				de mi dirección de correo electrónico y para que me envíe mensajes de correo electrónico acerca de
				productos destacados, historias originales, información sobre activismo, noticias de eventos y más de
				acuerdo con la política de privacidad de Your Next Store.
			</p>
		</form>
	);
}

export function Footer() {
	return (
		<footer className="dark border-t border-border bg-background">
			{/* Trust Bar */}
			<TrustBar />

			{/* Main links section */}
			<div className="border-t border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
						{/* Newsletter — col 1 / row 1 at all sizes */}
						<div>
							<h3 className="text-lg font-semibold text-foreground">Suscripción al boletín</h3>
							<p className="mt-3 text-sm text-muted-foreground leading-relaxed">
								Suscríbete para recibir ofertas exclusivas, historias originales, información sobre activismo,
								eventos y más.
							</p>
							<NewsletterForm />
						</div>

						{/* Ayuda — col 1 / row 2 at sm; col 2 / row 1 at lg */}
						<div className="text-center sm:text-left sm:col-start-1 sm:row-start-2 lg:col-start-2 lg:row-start-1">
							<h3 className="text-lg font-semibold text-foreground">Ayuda</h3>
							<div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
								{helpLinks.map((link) => (
									<YnsLink
										key={link.href}
										prefetch={"eager"}
										href={link.href}
										className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm text-foreground transition-colors hover:bg-foreground hover:text-background"
									>
										{link.label}
									</YnsLink>
								))}
							</div>
						</div>

						{/* Idioma / Conecta / Información — col 2 / rows 1–2 at sm; col 3 / row 1 at lg */}
						<div className="flex flex-col gap-8 text-center sm:text-left sm:col-start-2 sm:row-start-1 sm:row-span-2 lg:col-start-3 lg:row-start-1 lg:row-span-1">
							<div>
								<h3 className="text-lg font-semibold text-foreground">Idioma (si aplica)</h3>
								<p className="mt-2 text-sm text-muted-foreground">ES/EUR</p>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-foreground">Conecta</h3>
								<ul className="mt-3 space-y-2">
									{socialLinks.map((link) => (
										<li key={link.label}>
											<YnsLink
												prefetch={"eager"}
												href={link.href}
												className="text-sm text-muted-foreground hover:text-foreground transition-colors"
											>
												{link.label}
											</YnsLink>
										</li>
									))}
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-foreground">Información</h3>
								<p className="mt-2 text-sm text-muted-foreground">Formas de pago aceptadas</p>
								<div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
									{paymentMethods.map((method) => (
										<span
											key={method}
											className="inline-flex items-center rounded border border-border px-2 py-0.5 text-xs text-muted-foreground"
										>
											{method}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-sm text-muted-foreground">
						{legalLinks.map((link, i) => (
							<span key={link.href} className="flex items-center">
								<YnsLink
									prefetch={"eager"}
									href={link.href}
									className="hover:text-foreground transition-colors px-2 sm:px-3"
								>
									{link.label}
								</YnsLink>
								{i < legalLinks.length - 1 && <span className="hidden sm:inline select-none">|</span>}
							</span>
						))}
						<span className="hidden sm:inline select-none px-1">|</span>
						<span className="px-2 sm:px-3">
							&copy; {new Date().getFullYear()} Your Next Store, Inc. Todos los derechos reservados.
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
