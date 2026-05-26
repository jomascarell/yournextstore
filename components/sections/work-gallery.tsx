const galleryItems = [
	{ id: 1, label: "Selección Del Artista", href: "/piezas/1" },
	{ id: 2, label: "Novedades", href: "/piezas/2" },
	{ id: 3, label: "", href: "/piezas/3" },
	{ id: 4, label: "Los más vendidos", href: "/piezas/4" },
	{ id: 5, label: "Talleres", href: "/piezas/5" },
	{ id: 6, label: "Pieza 6", href: "/piezas/6" },
];

export function WorkGallery() {
	return (
		<section style={{ backgroundColor: "rgb(246,245,255)" }} className="py-24">
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
							aria-label={`Ver ${item.label}`}
						>
							{/* TODO: <Image fill src={item.image} alt={item.label} /> */}
							<div
								className="absolute inset-0"
								style={{ backgroundColor: "rgb(219,228,228)" }}
								aria-hidden="true"
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
                "
							>
								<span
									className="
                    inline-block cursor-pointer px-6 py-2.5 text-white text-sm
                    rounded-3xl border-t-[0.5px] border-r-2 border-b-4 border-white
                    transition-colors duration-200
                    hover:bg-white hover:text-[#0E100E]
                  "
								>
									Ver colección
								</span>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
