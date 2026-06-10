"use client";

import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div
			className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center"
			style={{ minHeight: "90vh" }}
		>
			<AlertCircleIcon className="size-16 text-muted-foreground/50" strokeWidth={1.5} />
			<h1 className="mt-6 text-7xl font-bold tracking-tight">Ha habido un error inesperado</h1>
			<p className="mt-2 text-sm text-muted-foreground">
				Seguramente se esta tratando de resolver el problema.
			</p>
			<div className="mt-8 flex items-center gap-4">
				<Button type="button" onClick={reset} variant="default">
					Página de inicio
				</Button>
			</div>
		</div>
	);
}
