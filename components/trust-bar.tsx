import { Home, Lock, MessageCircle, Truck } from "lucide-react";

const trustItems = [
	{
		icon: Lock,
		title: "Pago seguro",
		description: "Cifrado SSI · Stripe",
	},
	{
		icon: MessageCircle,
		title: "Soporte real",
		description: "WhatsApp · Email",
	},
	{
		icon: Truck,
		title: "Envío Gratis",
		description: "En pedidos desde 50€",
	},
	{
		icon: Home,
		title: "Devolución en 30 días",
		description: "Sin costes, sin preguntas",
	},
];

export function TrustBar() {
	return (
		<div className="bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
					{trustItems.map((item) => {
						const Icon = item.icon;
						return (
							<div
								key={item.title}
								className="flex flex-col items-center text-center gap-3 sm:items-start sm:text-left"
							>
								<Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
								<span className="text-base font-semibold text-foreground">{item.title}</span>
								<span className="text-sm text-muted-foDreground">{item.description}</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
