import { CheckCircle, Home, Lock, type LucideIcon, MessageSquare } from "lucide-react";

type TrustBadge = {
	icon: LucideIcon;
	title: string;
	description: string;
};

const row1: TrustBadge[] = [
	{ icon: Lock, title: "Pago seguro", description: "Cifrado SSL · Stripe" },
	{ icon: MessageSquare, title: "Soporte real", description: "WhatsApp · Email" },
];

const row2: TrustBadge[] = [
	{ icon: Home, title: "30d devolución", description: "Devolución en 30 días garantizada" },
	{ icon: CheckCircle, title: "Envío gratis", description: "En pedidos desde 50€" },
];

function BadgeItem({ badge }: { badge: TrustBadge }) {
	return (
		<div className="flex min-w-52.5 flex-col">
			<badge.icon className="h-6 w-6 text-foreground" />
			<p className="font-display text-base font-normal leading-none pt-4 pb-2">{badge.title}</p>
			<p className="font-sans text-sm leading-[1.6] text-foreground">{badge.description}</p>
		</div>
	);
}

export function TrustBadges() {
	return (
		<div className="flex flex-col gap-4 py-4 px-7.5">
			<div className="flex justify-between">
				{row1.map((badge) => (
					<BadgeItem key={badge.title} badge={badge} />
				))}
			</div>
			<div className="flex justify-between">
				{row2.map((badge) => (
					<BadgeItem key={badge.title} badge={badge} />
				))}
			</div>
		</div>
	);
}
