import { YnsLink } from "@/components/yns-link";

export function ImpactOverview() {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2">
			{/* Left: portrait image */}
			<div className="relative aspect-[640/864] w-full">
				{/* TODO: Replace with impact overview image — portrait, 640×864px, brand lifestyle photo */}
				<div
					className="absolute inset-0"
					style={{ backgroundColor: "rgb(219,228,228)" }}
					aria-hidden="true"
				/>
			</div>

			{/* Right: text */}
			<div className="flex flex-col justify-center gap-6 px-8 py-16 sm:px-12 lg:px-16 lg:py-24">
				<p className="text-xs font-normal tracking-widest text-muted-foreground uppercase">Nuestra misión</p>
				<h2 className="text-3xl font-normal leading-snug sm:text-4xl">
					Cada compra es un voto por un mundo más sostenible
				</h2>
				<p className="max-w-md text-sm leading-relaxed text-muted-foreground">
					Trabajamos con productores locales y materiales de origen responsable para crear piezas que van más
					allá de la moda. Creemos que la belleza y el impacto positivo no son incompatibles.
				</p>
				<div className="mt-2">
					<YnsLink
						prefetch="eager"
						href="/products"
						className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-sm font-normal text-background transition-colors hover:bg-foreground/90"
					>
						Comprar ahora
					</YnsLink>
				</div>
			</div>
		</section>
	);
}
