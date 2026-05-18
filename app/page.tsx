import { Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { ImpactOverview } from "@/components/sections/impact-overview";
import { ImpactReport } from "@/components/sections/impact-report";
import { ImpactSummary } from "@/components/sections/impact-summary";
import { RecentlyAdded } from "@/components/sections/recently-added";
import { SocialStrip } from "@/components/sections/social-strip";
import { WorkGallery } from "@/components/sections/work-gallery";

function RecentlyAddedSkeleton() {
	return (
		<section style={{ backgroundColor: "rgb(246,245,255)" }} className="py-24">
			<div className="mx-auto max-w-7xl px-8 sm:px-4 lg:px-20">
				<div className="mb-10 h-8 w-48 animate-pulse rounded bg-black/10" />
				<div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={`skeleton-${i}`}>
							<div className="mb-4 aspect-square animate-pulse rounded bg-black/10" />
							<div className="space-y-2">
								<div className="h-4 w-3/4 animate-pulse rounded bg-black/10" />
								<div className="h-4 w-1/4 animate-pulse rounded bg-black/10" />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default function Home() {
	return (
		<main>
			<Hero />
			<WorkGallery />
			<ImpactOverview />
			<ImpactReport />
			<Suspense fallback={<RecentlyAddedSkeleton />}>
				<RecentlyAdded />
			</Suspense>
			<ImpactSummary />
			<SocialStrip />
		</main>
	);
}
