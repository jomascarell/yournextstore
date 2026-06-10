import { Button } from "@/components/ui/button";
import { YnsLink } from "@/components/yns-link";

export function ImpactOverview() {
	return (
		<section style={{ backgroundColor: "#fff" }}>
			<div className="grid grid-cols-1 lg:grid-cols-2">
				{/* Left: image — flexible, expands with the viewport */}
				<div className="relative aspect-640/864 w-full">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								"linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), url('/images/images-home-page/IMG_2764.JPG')",
							backgroundSize: "cover",
							backgroundPosition: "50% center",
							backgroundRepeat: "no-repeat",
						}}
						aria-hidden="true"
					/>
				</div>

				{/*
				 * Right: text — inside the global max-w-7xl boundary.
				 * At any viewport width, 50% of the viewport = the midpoint of a centered
				 * max-w-7xl (1280px) container. So this column's left edge already aligns.
				 * The right padding grows dynamically so the content's right edge also
				 * stays within max-w-7xl: pr = max(4rem, (100vw - 80rem) / 2).
				 */}
				<div className="flex flex-col justify-center gap-6 px-7.5 py-24 sm:px-4 md:px-8 lg:pl-16 lg:pr-[max(4rem,calc((100vw-80rem)/2))]">
					<h2 className="text-4xl font-medium leading-11 tracking-[0.03em] text-foreground">
						Detras de la plata.
					</h2>
					<p className="text-muted-foreground">
						Joies Laia es una marca de joyería artesanal creada desde la curiosidad, el juego y las ganas de
						expresarme a través de las formas. Cada pieza está hecha a mano en plata 925, desde el primer
						esbozo hasta el acabado final.
					</p>
					<p className="text-muted-foreground">
						No trabajo desde la producción masiva ni desde la prisa; me interesa crear joyas con personalidad,
						pensadas para durar y acompañar. Para mí, la joyería es una manera de contar quién eras sin
						hablar.
					</p>
					<div className="mt-2">
						<Button variant="outline" asChild>
							<YnsLink prefetch="eager" href="/products">
								Consultar catálogo
							</YnsLink>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
