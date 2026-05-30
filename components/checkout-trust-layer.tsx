import { RefreshCcw, ShieldCheck, Truck } from "lucide-react";

const items = [
	{ Icon: ShieldCheck, title: "Pago seguro", subtitle: "SSL · Stripe" },
	{ Icon: RefreshCcw, title: "Devolución 30 días", subtitle: "Desde la entrega" },
	{ Icon: Truck, title: "Envío 24/48 h", subtitle: "Península" },
];

export function CheckoutTrustLayer() {
	return (
		<div className="grid grid-cols-3 gap-2 px-4 py-2">
			{items.map(({ Icon, title, subtitle }) => (
				<div key={title} className="flex flex-col items-center gap-1 text-center">
					<Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
					<span className="font-display text-sm leading-tight text-foreground">{title}</span>
					<span className="font-sans text-xs leading-tight text-muted-foreground">{subtitle}</span>
				</div>
			))}
		</div>
	);
}
