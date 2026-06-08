import Image from "next/image";

type InstagramPost = {
	id: number;
	image: string; // ruta en /public (p. ej. /social/post-1.jpg)
	alt: string;
	href: string; // enlace al post real de Instagram
};

const instagramPosts: InstagramPost[] = [
	{
		id: 1,
		image: "/images/images-home-page/IMG_2440.JPG",
		alt: "Pendientes artesanales sobre fondo neutro",
		href: "https://www.instagram.com/p/DXq8CBzjFts/?img_index=2",
	},
	{
		id: 2,
		image: "/social/post-2.jpg",
		alt: "Colgante de plata hecho a mano",
		href: "https://instagram.com/p/XXXXXXXXXXX",
	},
	{
		id: 3,
		image: "/social/post-3.jpg",
		alt: "Detalle de un anillo artesanal",
		href: "https://instagram.com/p/XXXXXXXXXXX",
	},
	{
		id: 4,
		image: "/social/post-4.jpg",
		alt: "Conjunto de pins de diseño",
		href: "https://instagram.com/p/XXXXXXXXXXX",
	},
];

export function SocialStrip() {
	return (
		<section style={{ backgroundColor: "#fff" }} className="py-24">
			<div className="mx-auto max-w-7xl px-7.5 sm:px-4 lg:px-20">
				<div className="mb-12 flex flex-col gap-1">
					<h2 className="text-5xl font-normal leading-none text-foreground">@joies.laia</h2>
					<p className="text-base text-muted-foreground">Follow us on social and stay connected.</p>
				</div>
			</div>

			{/* Carousel is full-bleed — outside max-w-7xl but left-aligned with content */}
			<div
				className="
          scrollbar-none flex overflow-x-auto
          snap-x snap-mandatory
          pl-7.5 pr-7.5 sm:pl-4 sm:pr-4
          lg:pl-[max(5rem,calc((100vw-80rem)/2+5rem))] lg:pr-20
        "
			>
				{instagramPosts.map((post) => (
					<a
						key={post.id}
						href={post.href}
						target="_blank"
						rel="noopener noreferrer"
						className="
              group relative shrink-0 snap-start overflow-hidden
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30
            "
						style={{ width: 320, aspectRatio: "320/476", backgroundColor: "rgb(219,228,228)" }}
						aria-label="Ver publicación en Instagram"
					>
						<Image
							src={post.image}
							alt={post.alt}
							fill
							sizes="320px"
							className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
						/>
					</a>
				))}
			</div>
		</section>
	);
}
