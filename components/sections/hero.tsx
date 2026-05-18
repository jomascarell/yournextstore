import { CtaSignUp } from "@/components/cta-sign-up";

export function Hero() {
	return (
		<section className="relative bg-black text-white min-h-[800px] flex items-center">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-4 sm:px-6 lg:grid-cols-2 lg:px-20">
				{/* Left: content */}
				<div className="flex flex-col justify-center gap-8 py-20 lg:py-28">
					<h1 className="text-5xl font-normal leading-tight tracking-wide sm:text-6xl lg:text-[64px]">
						Moda consciente.
						<br />
						Impacto positivo.
					</h1>
					<p className="max-w-md text-base leading-relaxed text-white/60">
						Piezas hechas con materiales sostenibles, diseñadas para durar y pensadas para quienes cuidan de
						su entorno.
					</p>
					<div className="flex max-w-[500px] flex-col gap-3">
						<CtaSignUp />
					</div>
				</div>

				{/* Right: hero image */}
				<div className="relative hidden lg:block">
					{/* TODO: Replace with hero image — portrait photo, approx 640×800px, full height of section */}
					<div
						className="absolute inset-0"
						style={{ backgroundColor: "rgb(219,228,228)" }}
						aria-hidden="true"
					/>
				</div>
			</div>
		</section>
	);
}
