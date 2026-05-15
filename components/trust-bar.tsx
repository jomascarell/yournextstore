import { HeadphonesIcon, RefreshCcw, ShieldCheck, Truck } from "lucide-react";

const trustItems = [
	{
		icon: Truck,
		title: "Envío gratuito",
		description: "En pedidos a partir de 80€",
	},
	{
		icon: RefreshCcw,
		title: "Devolución en 30 días",
		description: "Sin preguntas, sin coste",
	},
	{
		icon: ShieldCheck,
		title: "Pago seguro",
		description: "Cifrado SSL con Stripe",
	},
	{
		icon: HeadphonesIcon,
		title: "Soporte real",
		description: "Escríbenos cuando necesites",
	},
];

export function TrustBar() {
	return (
		<div className="border-t border-border bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
					{trustItems.map((item) => {
						const Icon = item.icon;
						return (
							<div key={item.title} className="flex flex-col items-center text-center gap-2">
								<Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
								<span className="text-sm font-semibold text-foreground">{item.title}</span>
								<span className="text-xs text-muted-foreground">{item.description}</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
