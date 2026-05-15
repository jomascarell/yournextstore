import { Lock, RefreshCcw, ShieldCheck } from "lucide-react";

export function CheckoutTrustLayer() {
	return (
		<div className="space-y-3">
			{/* Badge SSL */}
			<div className="flex items-center justify-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
				<Lock className="h-3.5 w-3.5 text-green-700 shrink-0" />
				<span className="text-xs font-medium text-green-700">
					Conexión segura SSL · Datos cifrados con Stripe
				</span>
			</div>

			{/* Garantías */}
			<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
				<div className="flex items-center gap-1.5">
					<RefreshCcw className="h-3.5 w-3.5 shrink-0" />
					<span>Devolución gratuita en 30 días</span>
				</div>
				<div className="flex items-center gap-1.5">
					<ShieldCheck className="h-3.5 w-3.5 shrink-0" />
					<span>Garantía de compra segura</span>
				</div>
			</div>
		</div>
	);
}
