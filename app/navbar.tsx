import { cacheLife } from "next/cache";
import { try_ } from "safe-try";
import { YnsLink } from "@/components/yns-link";
import { commerce } from "@/lib/commerce";

const linkClass =
	"font-display text-base font-medium text-black group-data-[dark=true]/header:text-white transition-colors";
const activeLinkClass = "font-semibold";

export async function Navbar() {
	"use cache";
	cacheLife("hours");

	const [, result] = await try_(commerce.collectionBrowse({ limit: 5 }));
	const collections = result?.data ?? [];

	return (
		<nav className="hidden sm:flex items-center gap-2.5">
			<YnsLink
				prefetch={"eager"}
				href="/"
				exactHrefMatch
				activeClassName={activeLinkClass}
				className={linkClass}
			>
				Home
			</YnsLink>
			<YnsLink prefetch={"eager"} href="/products" activeClassName={activeLinkClass} className={linkClass}>
				Products
			</YnsLink>
			{collections.map((collection) => (
				<YnsLink
					prefetch={"eager"}
					key={collection.id}
					href={`/collection/${collection.slug}`}
					activeClassName={activeLinkClass}
					className={linkClass}
				>
					{collection.name}
				</YnsLink>
			))}
		</nav>
	);
}
