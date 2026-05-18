import { CtaSignUp } from "@/components/cta-sign-up";

export function Hero() {
	return (
		<section
			className="relative min-h-[800px] flex items-center justify-center text-white text-center"
			style={{
				backgroundImage: "url('/images/images-home-page/IMG_2539.JPG')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Overlay oscuro semitransparente */}
			<div className="absolute inset-0 bg-black/20" />

			{/* Contenido */}
			<div className="relative z-10 flex flex-col items-center gap-8 px-4 max-w-4xl mx-auto py-20">
				<h1 className="text-5xl sm:text-6xl lg:text-[64px] font-medium leading-tight tracking-wide">
					Sé el primero en enterarte de las nuevas colecciones, los eventos especiales y las novedades de
					bella
				</h1>

				<div className="flex flex-col items-center gap-3 w-full max-w-[500px]">
					<CtaSignUp />
				</div>
			</div>
		</section>
	);
}
