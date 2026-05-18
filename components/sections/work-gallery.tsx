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
		<section style={{ backgroundColor: "rgb(246,245,255)" }} className="py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
				<h2 className="mb-10 text-2xl font-normal text-foreground">Nuestro trabajo</h2>
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
