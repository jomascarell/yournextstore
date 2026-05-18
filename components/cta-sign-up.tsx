"use client";

import { ArrowRight } from "lucide-react";
import { useActionState } from "react";
import { subscribeToNewsletter } from "@/app/newsletter/action";

export function CtaSignUp() {
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
					<button
						type="submit"
						disabled={isPending}
						className="flex shrink-0 items-center gap-2 rounded-full bg-neutral-900 px-4 py-1.5 text-sm text-white/95 transition-colors hover:bg-neutral-800 disabled:opacity-50"
					>
						{isPending ? "…" : "Sign in"}
						<ArrowRight className="h-3 w-3" />
					</button>
				</div>
				{state?.error && <p className="mt-2 text-xs text-red-400">{state.error}</p>}
			</form>
			<p className="text-xs leading-relaxed text-white/50">
				Al hacer clic en el botón «Suscribirme», doy mi consentimiento a Your Next Store para el tratamiento
				de mi dirección de correo electrónico y para que me envíe mensajes acerca de productos destacados,
				historias originales, eventos y más de acuerdo con la política de privacidad.
			</p>
		</>
	);
}
