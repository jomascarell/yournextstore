"use client";

import { type LucideIcon, RotateCcw, Ruler, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AccordionItem = {
	value: string;
	label: string;
	icon: LucideIcon;
	content: string;
};

const items: AccordionItem[] = [
	{
		value: "guia-de-tallas",
		label: "Guía de tallas",
		icon: Ruler,
		content: "Consulta nuestra guía de tallas para encontrar el ajuste perfecto.",
	},
	{
		value: "envios-y-devoluciones",
		label: "Envíos y Devoluciones",
		icon: RotateCcw,
		content: "Envío gratis en pedidos desde 50€. Devoluciones gratuitas en 30 días, sin preguntas.",
	},
	{
		value: "cuidado-del-producto",
		label: "Cuidado del producto",
		icon: Sparkles,
		content: "Sigue las instrucciones de cuidado para mantener el producto en perfectas condiciones.",
	},
];

export function ProductAccordions() {
	const [open, setOpen] = useState<string | null>(null);

	return (
		<div>
			<p className="font-display text-[30px] font-normal leading-none text-foreground mb-6">
				Te puede interesar
			</p>
			<div>
				{items.map((item, index) => {
					const isOpen = open === item.value;
					const isLast = index === items.length - 1;
					const Icon = item.icon;

					return (
						<div key={item.value} className={cn(!isLast && "border-b border-[rgb(188,188,188)]")}>
							<button
								type="button"
								className="flex w-full items-center justify-between py-4 text-left"
								onClick={() => setOpen(isOpen ? null : item.value)}
								aria-expanded={isOpen}
							>
								<span className="flex items-center gap-2">
									<Icon className="h-4 w-4 text-muted-foreground" />
									<span className="font-sans text-base text-foreground">{item.label}</span>
								</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									className={cn(
										"shrink-0 text-muted-foreground transition-transform duration-200",
										isOpen && "rotate-180",
									)}
								>
									<path
										d="M3 6l5 4 5-4"
										stroke="currentColor"
										strokeWidth="1.33"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
							{isOpen && <p className="pb-4 font-sans text-sm text-muted-foreground">{item.content}</p>}
						</div>
					);
				})}
			</div>
		</div>
	);
}
