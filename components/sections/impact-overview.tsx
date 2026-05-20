import { Button } from "@/components/ui/button";
import { YnsLink } from "@/components/yns-link";

export function ImpactOverview() {
	return (
		<section style={{ backgroundColor: "rgb(246,245,255)" }}>
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
						Natural Isn't Our New Direction. It's Our Origin.
					</h2>
					<p className="text-muted-foreground">
						But that's not the whole story. We go further. Organic and regenerative over conventional.
						Traceable over vague. Designed to last.
					</p>
					<p className="text-muted-foreground">Responsible style has never looked better.</p>
					<div className="mt-2">
						<Button variant="outline" asChild>
							<YnsLink prefetch="eager" href="/products">
								Comprar ahora
							</YnsLink>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
