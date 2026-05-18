import { ArrowRight } from "lucide-react";
import { cacheLife } from "next/cache";
import { ProductCard } from "@/components/product-card";
import { YnsLink } from "@/components/yns-link";
import { commerce } from "@/lib/commerce";

export async function RecentlyAdded() {
	"use cache";
	cacheLife("minutes");

	const { data: products } = await commerce.productBrowse({ active: true, limit: 4 });

	return (
		<section style={{ backgroundColor: "rgb(246,245,255)" }} className="py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
				<div className="mb-10 flex items-end justify-between">
					<h2 className="text-2xl font-normal text-foreground">Recién añadidos</h2>
					<YnsLink
						prefetch="eager"
						href="/products"
						className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
					>
						Ver todos
						<ArrowRight className="h-4 w-4" />
					</YnsLink>
				</div>
				<div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
				<div className="mt-10 text-center sm:hidden">
					<YnsLink
						prefetch="eager"
						href="/products"
						className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						Ver todos los productos
						<ArrowRight className="h-4 w-4" />
					</YnsLink>
				</div>
			</div>
		</section>
	);
}
