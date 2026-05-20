import { ArrowRight } from "lucide-react";
import { cacheLife } from "next/cache";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { YnsLink } from "@/components/yns-link";
import { commerce } from "@/lib/commerce";

export async function RecentlyAdded() {
	"use cache";
	cacheLife("minutes");

	const { data: products } = await commerce.productBrowse({ active: true, limit: 4 });

	return (
		<section style={{ backgroundColor: "rgb(246,245,255)" }} className="py-24">
			<div className="mx-auto max-w-7xl px-7.5 sm:px-4 lg:px-20">
				<div className="mb-14.5 flex items-end justify-between">
					<div className="flex flex-col gap-1">
						<h2 className="text-5xl font-normal leading-none text-foreground">Añadidos recientemente</h2>
						<p className="text-base text-muted-foreground">Better-for-your styles you&apos;ll love, too.</p>
					</div>
					<Button variant="outline" asChild className="hidden gap-2 sm:inline-flex">
						<YnsLink prefetch="eager" href="/products">
							Ver más
							<ArrowRight className="size-4" />
						</YnsLink>
					</Button>
				</div>
				<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
				<div className="mt-10 text-center sm:hidden">
					<Button variant="outline" asChild className="gap-2">
						<YnsLink prefetch="eager" href="/products">
							Ver todos los productos
							<ArrowRight className="size-4" />
						</YnsLink>
					</Button>
				</div>
			</div>
		</section>
	);
}
