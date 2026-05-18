import { YnsLink } from "@/components/yns-link";

export function ImpactSummary() {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2">
			{/* Left: text */}
			<div
				className="flex flex-col justify-center gap-6 px-8 py-16 sm:px-12 lg:px-16 lg:py-24"
				style={{ backgroundColor: "rgb(246,245,255)" }}
			>
				<h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-wide text-foreground">
					Feel it in person
				</h2>
				<p className="max-w-md text-muted-foreground">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet dignissim turpis. Nullam ac
					suscipit lectus, at maximus dui. Sed efficitur vitae risus vitae tempor. Aenean rutrum consectetur
					nisi tempor dictum. Donec mollis finibus mollis. Suspendisse ut mi nisl. Integer fermentum quam ut
					mauris auctor consequat. Etiam quis quam tortor. Phasellus eu justo eu ipsum aliquet consectetur
					vitae id quam. Curabitur sed orci ut ipsum tincidunt faucibus.
				</p>
				<div className="mt-2">
					<YnsLink
						prefetch="eager"
						href="/contact"
						className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-background transition-colors hover:bg-foreground/90"
					>
						Ponte en contacto
					</YnsLink>
				</div>
			</div>

			{/* Right: portrait image */}
			<div className="relative aspect-[640/864] w-full">
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
		</section>
	);
}
