import { YnsLink } from "@/components/yns-link";

export function ImpactOverview() {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2">
			{/* Left: portrait image */}
			<div className="relative aspect-[640/864] w-full">
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

			{/* Right: text */}
			<div
				className="flex flex-col justify-center gap-6 px-8 py-24 sm:px-12 lg:px-16"
				style={{ backgroundColor: "rgb(246,245,255)" }}
			>
				<h2 className="text-4xl font-medium leading-11 tracking-[0.03em] text-foreground">
					Natural Isn't Our New Direction. It's Our Origin.
				</h2>
				<p className="max-w-md text-muted-foreground">
					But that's not the whole story. We go further. Organic and regenerative over conventional. Traceable
					over vague. Designed to last.
				</p>
				<p className="max-w-md text-muted-foreground">Responsible style has never looked better.</p>
				<div className="mt-2">
					<YnsLink
						prefetch="eager"
						href="/products"
						className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-background transition-colors hover:bg-foreground/90"
					>
						Comprar ahora
					</YnsLink>
				</div>
			</div>
		</section>
	);
}
