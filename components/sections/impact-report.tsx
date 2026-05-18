import { YnsLink } from "@/components/yns-link";

export function ImpactReport() {
	return (
		<section className="relative w-full overflow-hidden" style={{ aspectRatio: "1280/644" }}>
			{/* TODO: Replace with impact report image — landscape, 1280×644px, editorial/documentary style */}
			<div className="absolute inset-0" style={{ backgroundColor: "rgb(219,228,228)" }} aria-hidden="true" />

			{/* Dark overlay */}
			<div className="absolute inset-0 bg-black/40" />

			{/* Text overlay — bottom left */}
			<div className="absolute bottom-0 left-0 flex max-w-xl flex-col gap-4 p-8 sm:p-12 lg:p-16">
				<p className="text-xs font-normal tracking-widest text-white/70 uppercase">Impact Report</p>
				<h2 className="text-3xl font-normal leading-snug text-white sm:text-4xl">
					Transparencia en cada paso de nuestra cadena
				</h2>
				<YnsLink
					prefetch="eager"
					href="/impact"
					className="mt-2 inline-flex w-fit items-center justify-center rounded-full border border-white px-8 py-3 text-sm font-normal text-white transition-colors hover:bg-white hover:text-black"
				>
					Leer el informe
				</YnsLink>
			</div>
		</section>
	);
}
