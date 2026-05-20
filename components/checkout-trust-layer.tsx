import { Lock, RefreshCcw, ShieldCheck } from "lucide-react";

const SSL_GREEN = "rgb(45,106,79)";
const SSL_BG = "rgb(216,243,220)";

export function CheckoutTrustLayer() {
	return (
		<div className="flex flex-col gap-6">
			{/* SSL trust badge — green pill */}
			<div
				className="flex w-full items-center justify-center gap-2 rounded-full px-3 py-2"
				style={{ backgroundColor: SSL_BG, border: `0.2px solid ${SSL_GREEN}` }}
			>
				<Lock className="h-3.5 w-3.5 shrink-0" style={{ color: SSL_GREEN }} />
				<span className="font-sans text-xs" style={{ color: SSL_GREEN }}>
					Conexión segura SSL · Datos cifrados con Stripe
				</span>
			</div>

			{/* Micro trust badges */}
			<div className="flex flex-wrap items-center justify-center gap-3">
				<div className="flex items-center gap-1.5">
					<RefreshCcw className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
					<span className="font-sans text-xs text-muted-foreground">Devolución gratuita en 30 días</span>
				</div>
				<div className="flex items-center gap-1.5">
					<ShieldCheck className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
					<span className="font-sans text-xs text-muted-foreground">Garantía de compra segura</span>
				</div>
			</div>
		</div>
	);
}
