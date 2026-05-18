export function ImpactReport() {
	return (
		<section className="relative w-full overflow-hidden" style={{ aspectRatio: "1280/644" }}>
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
				<p className="text-sm tracking-widest uppercase">Impact Report</p>
				<h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-wide">
					Natural Isn't Our New Direction.
					<br />
					It's Our Origin.
				</h2>
				<p className="text-base sm:text-lg">Responsible style has never looked better.</p>
			</div>
		</section>
	);
}
