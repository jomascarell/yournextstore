import { Button } from "@/components/ui/button";
import { YnsLink } from "@/components/yns-link";

export function ImpactSummary() {
	return (
		<section style={{ backgroundColor: "#fff" }}>
			<div className="grid grid-cols-1 lg:grid-cols-2">
				{/* Left: image — flexible, expands with the viewport */}
				<div className="relative aspect-640/864 w-full">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								"linear-gradient(0deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%), url('/images/images-home-page/Rocher_Laia_07.jpg')",
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
					<h2 className="text-5xl font-normal leading-none text-foreground">Encargos personalizados</h2>
					<p className="text-muted-foreground">
						Si tienes una idea, un recuerdo o alguna pieza especial en el jefe, podemos crearla juntas.
					</p>
					<p className="text-muted-foreground">
						Me gusta trabajar los encargos de forma próxima y personal, escuchando qué quieres transmitir y
						buscando una pieza que hablo de tú. Puedes escribirme por Instagram o a través del formulario de
						contacto.
					</p>
					<div className="mt-2">
						<Button variant="outline" asChild>
							<YnsLink prefetch="eager" href="/contact">
								Ponte en contacto
							</YnsLink>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
