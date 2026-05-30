import type { APICollectionGetByIdResult, APIProductsBrowseResult } from "commerce-kit";
import { CURRENCY, LOCALE } from "@/lib/constants";
import { formatMoney } from "@/lib/money";
import { isVideoUrl } from "@/lib/utils";
import { YNSMedia } from "@/lib/yns-media";
import { ProductCardHoverOverlay } from "./product-card-hover-overlay";
import { YnsLink } from "./yns-link";

type BrowseProduct = APIProductsBrowseResult["data"][number];
type CollectionProduct = APICollectionGetByIdResult["productCollections"][number]["product"];

export function ProductCard({
	product,
	priority = false,
}: {
	product: BrowseProduct | CollectionProduct;
	priority?: boolean;
}) {
	const variants = "variants" in product ? product.variants : null;
	const firstVariantPrice = variants?.[0] ? BigInt(variants[0].price) : null;
	const { minPrice, maxPrice } =
		variants && firstVariantPrice !== null
			? variants.reduce(
					(acc, v) => {
						const price = BigInt(v.price);
						return {
							minPrice: price < acc.minPrice ? price : acc.minPrice,
							maxPrice: price > acc.maxPrice ? price : acc.maxPrice,
						};
					},
					{ minPrice: firstVariantPrice, maxPrice: firstVariantPrice },
				)
			: { minPrice: null, maxPrice: null };

	const priceDisplay =
		variants && variants.length > 1 && minPrice && maxPrice && minPrice !== maxPrice
			? `${formatMoney({ amount: minPrice, currency: CURRENCY, locale: LOCALE })} - ${formatMoney({ amount: maxPrice, currency: CURRENCY, locale: LOCALE })}`
			: minPrice
				? formatMoney({ amount: minPrice, currency: CURRENCY, locale: LOCALE })
				: null;

	const allImages = [
		...(product.images ?? []),
		...(variants?.flatMap((v) => v.images ?? []).filter((img) => !(product.images ?? []).includes(img)) ??
			[]),
	];
	const primaryImage = allImages[0];
	const secondaryImage = allImages[1];

	const categoryName = "category" in product ? product.category?.name : null;

	return (
		<YnsLink prefetch={"eager"} href={`/product/${product.slug}`} className="group flex flex-col gap-3">
			{/* Image section — 3:5 aspect ratio */}
			<div className="relative aspect-[3/5] bg-secondary overflow-hidden">
				{primaryImage &&
					(isVideoUrl(primaryImage) ? (
						<video
							className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${secondaryImage ? "group-hover:opacity-0" : ""}`}
							src={primaryImage}
							muted
							loop
							autoPlay
							playsInline
						/>
					) : (
						<YNSMedia
							src={primaryImage}
							alt={product.name}
							fill
							priority={priority}
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${secondaryImage ? "group-hover:opacity-0" : ""}`}
						/>
					))}

				{secondaryImage &&
					(isVideoUrl(secondaryImage) ? (
						<video
							className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:transition-none"
							src={secondaryImage}
							muted
							loop
							autoPlay
							playsInline
						/>
					) : (
						<YNSMedia
							src={secondaryImage}
							alt={`${product.name} - alternate view`}
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						/>
					))}

				{/* Hover dark overlay */}
				<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30 motion-reduce:transition-none" />

				{/* Hover CTA: add-to-cart or size selector */}
				{variants && variants.length > 0 && (
					<ProductCardHoverOverlay
						variants={variants.map((v) => ({
							id: v.id,
							price: v.price,
							images: v.images,
							combinations: v.combinations,
						}))}
						product={{
							id: product.id,
							name: product.name,
							slug: product.slug,
							images: product.images ?? [],
						}}
					/>
				)}
			</div>

			{/* Product info */}
			<div className="flex flex-col gap-1">
				<p className="font-display text-2xl font-normal text-foreground leading-none">{product.name}</p>
				{categoryName && <p className="font-sans text-base text-foreground">{categoryName}</p>}
				{priceDisplay && <p className="font-sans text-base text-foreground">{priceDisplay}</p>}
			</div>
		</YnsLink>
	);
}
