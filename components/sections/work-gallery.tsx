const galleryItems = [
	{ id: 1, label: "Pieza 1" },
	{ id: 2, label: "Pieza 2" },
	{ id: 3, label: "Pieza 3" },
	{ id: 4, label: "Pieza 4" },
	{ id: 5, label: "Pieza 5" },
	{ id: 6, label: "Pieza 6" },
];

export function WorkGallery() {
	return (
		<section style={{ backgroundColor: "rgb(246,245,255)" }} className="py-24">
			<div className="mx-auto max-w-7xl px-8 sm:px-4 lg:px-20">
				<div className="mb-12 flex flex-col gap-1">
					<h2 className="text-5xl font-normal leading-none text-foreground">
						Una pequeña muestra de mi trabajo
					</h2>
					<p className="text-base text-muted-foreground">
						Piezas únicas, elaboradas con cuidado y atención al detalle.
					</p>
				</div>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
					{galleryItems.map((item) => (
						<div key={item.id} className="relative overflow-hidden" style={{ aspectRatio: "304/600" }}>
							{/* TODO: Replace with gallery image — tall portrait, approx 304×600px, product/editorial photo */}
							<div
								className="absolute inset-0"
								style={{ backgroundColor: "rgb(219,228,228)" }}
								aria-hidden="true"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
