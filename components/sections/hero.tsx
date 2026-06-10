import { Button } from "@/components/ui/button";
import { YnsLink } from "@/components/yns-link";

export function Hero() {
	return (
		<section
			className="relative min-h-[624px] flex items-center justify-center text-white text-center"
			style={{
				backgroundImage: "url('/images/images-home-page/IMG_2539.JPG')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="absolute inset-0 bg-black/20" />

			<div className="relative z-10 flex flex-col items-center px-6 max-w-4xl mx-auto py-20 pb-6">
				<div className="flex flex-col items-center gap-3">
					<p className="text-base sm:text-lg font-normal leading-none tracking-wide">Hola, Soy Laia</p>
					<h1 className="text-5xl sm:text-6xl lg:text-[64px] font-medium leading-tight tracking-wide">
						Formas, texturas y plata.
					</h1>
					<p className="text-lg sm:text-xl lg:text-2xl font-normal leading-tight tracking-wide">
						Joyas nacidas entre pruebas, intuiciones y ganas de jugar.
					</p>
				</div>
				<div className="pt-6">
					<Button asChild size="lg">
						<YnsLink prefetch="eager" href="/products">
							Comprar ahora
						</YnsLink>
					</Button>
				</div>
			</div>
		</section>
	);
}
