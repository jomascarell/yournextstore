import { ShoppingCartIcon } from "lucide-react";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { YnsLink } from "@/components/yns-link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
	title: "Page Not Found",
	description:
		"This page doesn't exist or has been moved. Continue shopping to find what you're looking for.",
};

export default function NotFound() {
	return (
		<div
			className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center"
			style={{ minHeight: "90vh" }}
		>
			<ShoppingCartIcon className="size-16 text-muted-foreground/50" strokeWidth={1.5} />
			<h1 className="mt-6 text-7xl font-bold tracking-tight">Hmm... algo está desconectado</h1>
			<h2 className="mt-4 text-xl text-muted-foreground">
				Fun fact: este mensaje aparece cuando la página que buscas no existe o ha sido movida, verifica la URL
				o vuelve a conectarte a la página de inicio.
			</h2>
			<YnsLink href="/" className={cn(buttonVariants({ variant: "default" }), "mt-8")}>
				Página de inicio
			</YnsLink>
		</div>
	);
}
