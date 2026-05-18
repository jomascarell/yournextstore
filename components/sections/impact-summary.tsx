import { YnsLink } from "@/components/yns-link";

export function ImpactSummary() {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2">
			{/* Left: image */}
			<div className="relative aspect-square w-full lg:aspect-auto">
				{/* TODO: Replace with impact summary image — square or portrait, in-store/showroom photo */}
				<div
					className="absolute inset-0"
					style={{ backgroundColor: "rgb(219,228,228)" }}
					aria-hidden="true"
				/>
			</div>

			{/* Right: headline */}
			<div className="flex flex-col justify-center gap-8 bg-neutral-50 px-8 py-16 sm:px-12 lg:px-16 lg:py-24">
				<h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal leading-tight tracking-wide uppercase">
					Feel it
					<br />
					in person
				</h2>
				<p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
					Visita nuestro espacio y descubre la textura, el color y la esencia de cada pieza. La experiencia
					física completa lo que las palabras no pueden describir.
				</p>
				<YnsLink
					prefetch="eager"
					href="/contact"
					className="inline-flex w-fit items-center justify-center rounded-full border border-foreground px-8 py-3 text-sm font-normal text-foreground transition-colors hover:bg-foreground hover:text-background"
				>
					Ver ubicación
				</YnsLink>
			</div>
		</section>
	);
}
