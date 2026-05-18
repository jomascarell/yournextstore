import { YnsLink } from "@/components/yns-link";

export function StoryPanels() {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2">
			{/* Panel A — light */}
			<div className="relative flex min-h-[600px] flex-col bg-white">
				{/* TODO: Replace with story panel A image — editorial photo, fills top ~70% of panel */}
				<div className="flex-1" style={{ backgroundColor: "rgb(219,228,228)" }} aria-hidden="true" />
				<div className="flex flex-col gap-3 p-8">
					<p className="text-xs tracking-widest text-muted-foreground uppercase">Materiales</p>
					<h3 className="text-2xl font-normal text-foreground">Del campo a tu guardarropa</h3>
					<p className="text-sm leading-relaxed text-muted-foreground">
						Fibras naturales certificadas, tintes vegetales y procesos artesanales que respetan el entorno.
					</p>
					<YnsLink
						prefetch="eager"
						href="/about"
						className="mt-1 text-sm font-normal text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
					>
						Conocer más
					</YnsLink>
				</div>
			</div>

			{/* Panel B — dark */}
			<div className="relative flex min-h-[600px] flex-col bg-neutral-900">
				{/* TODO: Replace with story panel B image — editorial photo, fills top ~70% of panel */}
				<div className="flex-1" style={{ backgroundColor: "rgb(60,60,60)" }} aria-hidden="true" />
				<div className="flex flex-col gap-3 p-8">
					<p className="text-xs tracking-widest text-white/50 uppercase">Comunidad</p>
					<h3 className="text-2xl font-normal text-white">Las personas detrás de cada pieza</h3>
					<p className="text-sm leading-relaxed text-white/60">
						Artesanas y productores locales que ponen su alma en cada costura. Salarios justos, condiciones
						dignas.
					</p>
					<YnsLink
						prefetch="eager"
						href="/about"
						className="mt-1 text-sm font-normal text-white underline underline-offset-4 hover:text-white/70 transition-colors"
					>
						Conocer más
					</YnsLink>
				</div>
			</div>
		</section>
	);
}
