export function ImpactReport() {
	return (
		<section className="relative w-full overflow-hidden h-160">
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: "url('/images/images-home-page/IMG_2440.JPG')",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				aria-hidden="true"
			/>

			{/* Dark overlay */}
			<div className="absolute inset-0 bg-black/25" />

			{/* Text — centered */}
			<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center text-white">
				<p className="text-2xl font-normal uppercase">Plata 925</p>
				<h2 className="text-4xl font-medium leading-11 tracking-[0.03em]">
					La major part de les joies estan fetes en plata de llei 925,
					<br />
					un material durador i atemporal.
				</h2>
				<p className="text-base">El estilo responsable nunca ha tenido mejor aspecto.</p>
			</div>
		</section>
	);
}
