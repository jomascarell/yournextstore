"use client";

import type { VariantProps } from "class-variance-authority";
import { useActionState } from "react";
import { subscribeToNewsletter } from "@/app/newsletter/action";
import { Button, type buttonVariants } from "@/components/ui/button";

type CtaSignUpProps = {
	buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
};

export function CtaSignUp({ buttonVariant = "default" }: CtaSignUpProps) {
	const [state, action, isPending] = useActionState(subscribeToNewsletter, null);

	if (state?.success) {
		return <p className="text-sm text-white/60">¡Gracias! Te hemos añadido a la lista.</p>;
	}

	return (
		<>
			<form action={action}>
				<div className="flex items-center border border-white/80 bg-white/20 pl-6 pr-1 py-1">
					<input
						type="email"
						name="email"
						placeholder="@tucorreo"
						required
						className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/50"
					/>
					<Button type="submit" variant={buttonVariant} size="sm" disabled={isPending}>
						{isPending ? "…" : "Suscribirse"}
					</Button>
				</div>
				{state?.error && <p className="mt-2 text-xs text-red-400">{state.error}</p>}
			</form>
			<p className="text-xs leading-relaxed text-white/70">
				Al hacer clic en el botón «Suscribirme», doy mi consentimiento a Your Next Store para el tratamiento
				de mi dirección de correo electrónico y para que me envíe mensajes acerca de productos destacados,
				historias originales, eventos y más de acuerdo con la política de privacidad.
			</p>
		</>
	);
}
