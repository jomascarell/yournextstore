import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/app/product/[slug]/add-to-cart-button";
import { MediaGallery } from "@/app/product/[slug]/media-gallery";
import { ProductAccordions } from "@/app/product/[slug]/product-accordions";
import { RelatedProducts } from "@/app/product/[slug]/related-products";
import { TrustBadges } from "@/app/product/[slug]/trust-badges";
import { TiptapRenderer } from "@/components/tiptap-renderer";
import { commerce } from "@/lib/commerce";
import { CURRENCY, LOCALE } from "@/lib/constants";
import { buildProductBreadcrumbJsonLd, buildProductJsonLd, JsonLdScript } from "@/lib/json-ld";
import { formatMoney } from "@/lib/money";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const product = await commerce.productGet({ idOrSlug: slug });

	if (!product) {
		return { title: "Product Not Found — Your Next Store" };
	}

	return {
		title: `${product.name} — Your Next Store`,
		description: product.summary ?? undefined,
		openGraph: {
			title: product.name,
			description: product.summary ?? undefined,
			images: product.images[0] ? [product.images[0]] : undefined,
		},
	};
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
	"use cache";
	cacheLife("minutes");

	return <ProductDetails params={props.params} />;
}

const ProductDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const [product, reviews] = await Promise.all([
		commerce.productGet({ idOrSlug: slug }),
		commerce.productReviewsBrowse({ idOrSlug: slug }, { limit: 20 }),
	]);

	if (!product) {
		notFound();
	}

	const { minPrice, maxPrice } = product.variants.reduce(
		(acc, v) => {
			const price = BigInt(v.price);
			return {
				minPrice: price < acc.minPrice ? price : acc.minPrice,
				maxPrice: price > acc.maxPrice ? price : acc.maxPrice,
			};
		},
		{
			minPrice: product.variants[0] ? BigInt(product.variants[0].price) : BigInt(0),
			maxPrice: product.variants[0] ? BigInt(product.variants[0].price) : BigInt(0),
		},
	);

	const priceDisplay =
		product.variants.length > 1 && minPrice !== maxPrice
			? `${formatMoney({ amount: minPrice, currency: CURRENCY, locale: LOCALE })} - ${formatMoney({ amount: maxPrice, currency: CURRENCY, locale: LOCALE })}`
			: formatMoney({ amount: minPrice, currency: CURRENCY, locale: LOCALE });

	const allImages = [
		...product.images,
		...product.variants.flatMap((v) => v.images).filter((img) => !product.images.includes(img)),
	];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<JsonLdScript data={buildProductJsonLd(product, reviews)} />
			<JsonLdScript data={buildProductBreadcrumbJsonLd(product)} />
			<div className="lg:grid lg:grid-cols-2 lg:gap-16">
				{/* Left: Image Gallery (sticky on desktop) */}
				<MediaGallery images={allImages} productName={product.name} variants={product.variants} />

				{/* Right: Product Info */}
				<div className="mt-8 lg:mt-0 space-y-12">
					{/* Title, Price, Description */}
					<div className="space-y-2">
						<div>
							<h1 className="font-display text-[36px] font-medium leading-none tracking-[0.03em] text-foreground">
								{product.name}
							</h1>
							<p className="font-sans text-base font-normal text-foreground mt-1">{priceDisplay}</p>
						</div>
						{product.summary && (
							<p className="font-sans text-base text-muted-foreground leading-relaxed">{product.summary}</p>
						)}
						{product.content && (
							<div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
								<TiptapRenderer content={product.content} />
							</div>
						)}
					</div>

					{/* Variant Selector, Quantity, Add to Cart */}
					<AddToCartButton
						variants={product.variants}
						product={{
							id: product.id,
							name: product.name,
							slug: product.slug,
							images: product.images,
						}}
					/>

					{/* Trust Features */}
					<TrustBadges />

					{/* Accordions */}
					<ProductAccordions />
				</div>
			</div>

			{/* Related Products */}
			<RelatedProducts productId={product.id} categorySlug={product.category?.slug} />
		</div>
	);
};
