import { YnsLink } from "@/components/yns-link";

const instagramPosts = [
	{ id: 1, label: "Post 1" },
	{ id: 2, label: "Post 2" },
	{ id: 3, label: "Post 3" },
	{ id: 4, label: "Post 4" },
];

export function SocialStrip() {
	return (
		<section style={{ backgroundColor: "rgb(246,245,255)" }} className="py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
				<div className="mb-8 flex items-end justify-between">
					<h2 className="text-2xl font-normal text-foreground">@joies.laia</h2>
					<YnsLink
						prefetch="eager"
						href="https://instagram.com/joies.laia"
						className="text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						Seguir en Instagram
					</YnsLink>
				</div>

				{/* Horizontal scrollable row */}
				<div className="scrollbar-none -mx-4 flex gap-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:-mx-20 lg:px-20">
					{instagramPosts.map((post) => (
						<div
							key={post.id}
							className="relative aspect-square shrink-0 overflow-hidden"
							style={{ width: 320, backgroundColor: "rgb(219,228,228)" }}
						>
							{/* TODO: Replace with Instagram post image — square, 320×320px */}
							<span className="sr-only">{post.label}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
