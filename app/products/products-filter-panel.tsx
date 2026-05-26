import { ChevronUp } from "lucide-react";
import { cacheLife } from "next/cache";
import { YnsLink } from "@/components/yns-link";
import { commerce } from "@/lib/commerce";

async function getCategories() {
	"use cache";
	cacheLife("hours");
	return commerce.categoriesBrowse({ active: true });
}

function buildCategoryUrl({
	currentCategory,
	currentSort,
	toggleSlug,
}: {
	currentCategory?: string;
	currentSort?: string;
	toggleSlug: string;
}) {
	const params = new URLSearchParams();
	if (currentSort) params.set("sort", currentSort);
	if (currentCategory !== toggleSlug) {
		params.set("category", toggleSlug);
	}
	const qs = params.size ? `?${params.toString()}` : "";
	return `/products${qs}`;
}

function buildClearUrl({ currentSort }: { currentSort?: string }) {
	const params = new URLSearchParams();
	if (currentSort) params.set("sort", currentSort);
	const qs = params.size ? `?${params.toString()}` : "";
	return `/products${qs}`;
}

export async function FilterPanel({
	currentCategory,
	currentSort,
	/** Hide the "Filtros" heading — used when the panel is rendered inside the drawer,
	 *  which already has its own title in the SheetHeader. */
	showTitle = true,
}: {
	currentCategory?: string;
	currentSort?: string;
	showTitle?: boolean;
}) {
	const categoriesResult = await getCategories();
	const categories = categoriesResult.data;
	const hasFilters = !!currentCategory;
	const clearUrl = buildClearUrl({ currentSort });

	return (
		<div className="flex flex-col gap-4 w-full">
			{/* Title row — hidden inside the drawer */}
			{showTitle && (
				<div className="flex items-center justify-between">
					<span className="font-['Josefin_Sans',sans-serif] font-normal text-[#0e100e] text-3xl leading-none">
						Filtros
					</span>
					{hasFilters && (
						<YnsLink
							href={clearUrl}
							className="font-['Lato',sans-serif] font-bold text-[#050605] text-sm underline"
						>
							Borrar filtros
						</YnsLink>
					)}
				</div>
			)}

			{/* "Borrar filtros" when title is hidden (drawer mode) */}
			{!showTitle && hasFilters && (
				<div className="flex justify-end">
					<YnsLink
						href={clearUrl}
						className="font-['Lato',sans-serif] font-bold text-[#050605] text-sm underline"
					>
						Borrar filtros
					</YnsLink>
				</div>
			)}

			{/* Accordion sections */}
			<div className="flex flex-col">
				{/* CATEGORÍAS — open by default */}
				{categories.length > 0 && (
					<details className="group border-t border-[#bcbcbc]" open>
						<summary className="flex items-center justify-between py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
							<span className="font-['Lato',sans-serif] text-[#0e100e] text-sm uppercase tracking-wide">
								Categorías
							</span>
							{/* group-open: rotates to 0° (up) when open; base rotate-180 points down when closed */}
							<ChevronUp className="size-4 text-[#0e100e] transition-transform duration-200 rotate-180 group-open:rotate-0" />
						</summary>
						<div className="flex flex-col pb-3">
							{categories.map((category) => {
								const isSelected = currentCategory === category.slug;
								const href = buildCategoryUrl({
									currentCategory,
									currentSort,
									toggleSlug: category.slug,
								});
								return (
									<YnsLink
										key={category.id}
										href={href}
										prefetch="eager"
										className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-[#f5f5f5] transition-colors rounded"
									>
										<div
											className={`size-[14px] rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
												isSelected ? "bg-[#050605] border-[#050605]" : "border-[#bcbcbc]"
											}`}
										>
											{isSelected && (
												<svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden>
													<path
														d="M1 3.5L3.5 6L8 1"
														stroke="white"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											)}
										</div>
										<span className="font-['Lato',sans-serif] text-[#050605] text-base leading-none">
											{category.name}
										</span>
									</YnsLink>
								);
							})}
						</div>
					</details>
				)}

				{/* COLECCIONES — collapsed by default (phase 2) */}
				<details className="group border-t border-[#bcbcbc]">
					<summary className="flex items-center justify-between py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
						<span className="font-['Lato',sans-serif] text-[#0e100e] text-sm uppercase tracking-wide">
							Colecciones
						</span>
						<ChevronUp className="size-4 text-[#0e100e] transition-transform duration-200 rotate-180 group-open:rotate-0" />
					</summary>
					<div className="pb-3">
						<p className="font-['Lato',sans-serif] text-[#a8a9a8] text-sm px-2">Próximamente</p>
					</div>
				</details>
			</div>
		</div>
	);
}
