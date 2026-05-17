import type { APICollectionGetByIdResult, APIProductsBrowseResult } from "commerce-kit";
import { CURRENCY, LOCALE } from "@/lib/constants";
import { formatMoney } from "@/lib/money";
import { isVideoUrl } from "@/lib/utils";
import { YNSMedia } from "@/lib/yns-media";
import { QuickAddButton } from "./quick-add-button";
import { YnsLink } from "./yns-link";

type BrowseProduct = APIProductsBrowseResult["data"][number];
type CollectionProduct = APICollectionGetByIdResult["productCollections"][number]["product"];

export function ProductCard({ product }: { product: BrowseProduct | CollectionProduct }) {
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

	const singleVariant = variants?.length === 1 ? variants[0] : null;

	return (
		<YnsLink prefetch={"eager"} href={`/product/${product.slug}`} className="group flex flex-col">
			{/* Image */}
			<div className="relative aspect-3/4 bg-secondary rounded-2xl overflow-hidden mb-4">
				{primaryImage &&
					(isVideoUrl(primaryImage) ? (
						<video
							className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${secondaryImage ? "group-hover:opacity-0" : ""}`}
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
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className={`object-cover transition-opacity duration-500 ${secondaryImage ? "group-hover:opacity-0" : ""}`}
						/>
					))}

				{secondaryImage &&
					(isVideoUrl(secondaryImage) ? (
						<video
							className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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

				{/* Dark overlay on hover */}
				<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

				{/* Product name — bottom by default, fades out on hover */}
				<div className="absolute bottom-4 left-4 right-4 transition-opacity duration-300 group-hover:opacity-0">
					<p className="text-sm font-semibold text-white drop-shadow">{product.name}</p>
				</div>

				{/* Product name — top, visible only on hover */}
				<div className="absolute top-4 left-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
					<p className="text-base font-semibold text-white">{product.name}</p>
				</div>

				{/* CTA buttons — visible only on hover */}
				<div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
					<span className="flex h-10 w-full items-center justify-center rounded-full bg-foreground text-background text-sm font-medium">
						Ver producto
					</span>
					{singleVariant && (
						<QuickAddButton
							variantId={singleVariant.id}
							variantPrice={singleVariant.price}
							variantImages={singleVariant.images}
							product={{
								id: product.id,
								name: product.name,
								slug: product.slug,
								images: product.images ?? [],
							}}
							className="flex h-10 w-full cursor-pointer items-center justify-center rounded-full border border-white/70 bg-transparent text-white text-sm font-medium transition-colors hover:bg-white/10 disabled:opacity-50"
						>
							Añadir al carrito
						</QuickAddButton>
					)}
				</div>
			</div>

			{/* Product info */}
			<div className="flex flex-col gap-1 px-1">
				<p className="text-sm text-muted-foreground leading-snug">{product.name}</p>
				<p className="text-lg font-semibold text-foreground">{priceDisplay}</p>
			</div>
		</YnsLink>
	);
}
