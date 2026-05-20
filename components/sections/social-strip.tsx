const instagramPosts = [
	{ id: 1, label: "Post 1" },
	{ id: 2, label: "Post 2" },
	{ id: 3, label: "Post 3" },
	{ id: 4, label: "Post 4" },
];

export function SocialStrip() {
	return (
		<section style={{ backgroundColor: "rgb(246,245,255)" }} className="py-24">
			<div className="mx-auto max-w-7xl px-7.5 sm:px-4 lg:px-20">
				<div className="mb-12 flex flex-col gap-1">
					<h2 className="text-5xl font-normal leading-none text-foreground">@joies.laia</h2>
					<p className="text-base text-muted-foreground">Follow us on social and stay connected.</p>
				</div>
			</div>

			{/* Carousel is full-bleed — outside max-w-7xl but left-aligned with content */}
			<div className="scrollbar-none flex gap-6 overflow-x-auto pl-7.5 sm:pl-4 lg:pl-[max(5rem,calc((100vw-80rem)/2+5rem))]">
				{instagramPosts.map((post) => (
					<div
						key={post.id}
						className="relative shrink-0 overflow-hidden"
						style={{ width: 320, aspectRatio: "320/476", backgroundColor: "rgb(219,228,228)" }}
					>
						{/* TODO: Replace with Instagram post image — 320×476px */}
						<span className="sr-only">{post.label}</span>
					</div>
				))}
			</div>
		</section>
	);
}
