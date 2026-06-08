import Image from "next/image";
import { Button } from "@/components/ui/button";

type GalleryItem = {
	id: number;
	label: string;
	href: string;
	image: string; // ruta en /public o URL remota (configurar dominio en next.config si es remota)
	alt: string;
};

const galleryItems: GalleryItem[] = [
	{
		id: 1,
		label: "Pendientes",
		href: "/#",
		image: "/images/images-home-page/IMG_2440.JPG",
		alt: "Pendientes artesanales de plata",
	},
	{
		id: 2,
		label: "", // TODO: confirmar categoría (antes estaba vacío)
		href: "/#",
		image: "/gallery/pulseras.jpg",
		alt: "Pulseras hechas a mano",
	},
	{
		id: 3,
		label: "Colgantes",
		href: "/#",
		image: "/gallery/colgantes.jpg",
		alt: "Colgantes únicos",
	},
	{
		id: 4,
		label: "", // TODO: confirmar categoría (antes estaba vacío)
		href: "#",
		image: "/gallery/collares.jpg",
		alt: "Collares artesanales",
	},
	{
		id: 5,
		label: "Pins",
		href: "/#",
		image: "/gallery/pins.jpg",
		alt: "Pins de diseño",
	},
	{
		id: 6,
		label: "Anillo",
		href: "/#",
		image: "/gallery/anillos.jpg",
		alt: "Anillos artesanales",
	},
];

export function WorkGallery() {
	return (
		<section style={{ backgroundColor: "#fff" }} className="py-24">
			{/* Heading */}
			<div className="mx-auto max-w-7xl px-7.5 sm:px-4 lg:px-20">
				<div className="mb-12 flex flex-col gap-1">
					<h2 className="text-5xl font-normal leading-none text-foreground">
						Una pequeña muestra de mi trabajo
					</h2>
					<p className="text-base text-muted-foreground">
						Piezas únicas, elaboradas con cuidado y atención al detalle.
					</p>
				</div>
			</div>

			{/* Cards grid */}
			<div className="mx-auto max-w-244.5 px-7.5 sm:px-4 lg:px-20">
				<div className="grid grid-cols-2 gap-x-8.25 gap-y-12.5 sm:grid-cols-3">
					{galleryItems.map((item) => (
						<a
							key={item.id}
							href={item.href}
							className="
                group relative block overflow-hidden
                rounded-3xl
                transition-[border-radius] duration-500 ease-in-out
                hover:rounded-[3.5rem] focus-visible:rounded-[3.5rem]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30
                shadow-[0_1px_2px_rgba(0,0,0,0.6)]
              "
							style={{ aspectRatio: "304/600", maxHeight: "600px" }}
							aria-label={`Ver ${item.label || "productos"}`}
						>
							{/* Imagen de fondo */}
							<Image
								src={item.image}
								alt={item.alt}
								fill
								sizes="(max-width: 640px) 50vw, 33vw"
								className="object-cover"
							/>

							{/* Overlay oscuro: solo visible en hover/focus */}
							<div
								className="
                  absolute inset-0
                  bg-gradient-to-t from-black/55 via-black/20 to-black/35
                  opacity-0 transition-opacity duration-500 ease-out
                  group-hover:opacity-100 group-focus-visible:opacity-100
                  motion-reduce:transition-none
                "
								aria-hidden="true"
							/>

							{/* Título: SIEMPRE visible, anclado abajo */}
							<h3
								className="
                  absolute inset-0 flex items-center justify-center
                  text-white text-2xl font-normal leading-tight m-0
                  [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]
                  z-10
                  transition-opacity duration-300
                  group-hover:opacity-0
                "
							>
								{item.label}
							</h3>

							{/* Botón: centrado verticalmente, aparece en hover */}
							<div
								className="
                  absolute inset-0 flex items-center justify-center
                  opacity-0 translate-y-2
                  transition-[opacity,transform] duration-500 ease-out delay-150
                  group-hover:opacity-100 group-hover:translate-y-0
                  group-focus-visible:opacity-100 group-focus-visible:translate-y-0
                  motion-reduce:transition-none motion-reduce:translate-y-0
                  z-10
                "
							>
								<Button
									variant="outline-white"
									className="pointer-events-none group-hover:pointer-events-auto"
									tabIndex={-1}
									aria-hidden="true"
								>
									Ver productos
								</Button>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
