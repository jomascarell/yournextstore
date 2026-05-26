"use client";

import { SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const sortOptions = [
	{ value: "newest", label: "Más recientes" },
	{ value: "price-asc", label: "Precio: de menor a mayor" },
	{ value: "price-desc", label: "Precio: de mayor a menor" },
	{ value: "name", label: "Nombres: A-Z" },
] as const;

type Props = {
	currentSort?: string;
	currentCategory?: string;
	currentCategoryName?: string;
	filterPanelContent: React.ReactNode;
};

export function ProductsInteractive({
	currentSort,
	currentCategory,
	currentCategoryName,
	filterPanelContent,
}: Props) {
	const router = useRouter();
	const [drawerOpen, setDrawerOpen] = useState(false);

	function buildUrl(overrides: { sort?: string | null; category?: string | null }) {
		const params = new URLSearchParams();
		const sort = "sort" in overrides ? overrides.sort : currentSort;
		const category = "category" in overrides ? overrides.category : currentCategory;
		if (sort) params.set("sort", sort);
		if (category) params.set("category", category);
		const qs = params.size ? `?${params.toString()}` : "";
		return `/products${qs}`;
	}

	function buildSortUrl(value: string) {
		return buildUrl({ sort: value === "newest" ? null : value });
	}

	function handleRemoveCategory() {
		router.push(buildUrl({ category: null }));
	}

	const activeSort = currentSort ?? "newest";
	const hasActiveFilters = !!currentCategory;
	const chipLabel = currentCategoryName ?? currentCategory ?? "";

	return (
		<>
			<div className="flex flex-col gap-2 pb-5">
				{/* Row 1: sort text links + mobile filter button */}
				<div className="flex items-center gap-2 flex-wrap">
					<div className="flex items-center gap-2 flex-wrap flex-1">
						{sortOptions.map(({ value, label }) => {
							const isActive = activeSort === value;
							return (
								<Link
									key={value}
									href={buildSortUrl(value)}
									prefetch
									className={`text-sm font-['Lato',sans-serif] whitespace-nowrap transition-colors ${
										isActive ? "font-bold text-[#050605]" : "text-[#828382] hover:text-[#050605]"
									}`}
								>
									{label}
								</Link>
							);
						})}
					</div>

					{/* Filter button — mobile/tablet only */}
					<button
						type="button"
						onClick={() => setDrawerOpen(true)}
						className="lg:hidden bg-white border border-[#bcbcbc] flex items-center gap-1.5 px-3 h-7 text-sm text-[#050605] font-['Lato',sans-serif] shrink-0"
					>
						<SlidersHorizontal className="size-4" />
						Filtrar
					</button>
				</div>

				{/* Row 2: "no filters" note or active chip */}
				{!hasActiveFilters ? (
					<p className="text-sm font-['Lato',sans-serif] text-[#353635]">No se han aplicado filtros</p>
				) : (
					<div className="flex items-center gap-4">
						<div className="border border-[#bcbcbc] flex items-center gap-2 px-2.5 py-0.5 rounded-full">
							<span className="text-sm text-[#0e100e] font-['Lato',sans-serif]">{chipLabel}</span>
							<button type="button" onClick={handleRemoveCategory} aria-label="Eliminar filtro de categoría">
								<X className="size-2.5 text-[#0e100e]" />
							</button>
						</div>
						<button
							type="button"
							onClick={handleRemoveCategory}
							className="font-['Lato',sans-serif] font-bold text-sm text-[#050605] underline"
						>
							Borrar
						</button>
					</div>
				)}
			</div>

			{/* Mobile filter drawer */}
			<Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
				<SheetContent side="right" className="w-[376px] max-w-full p-0 overflow-y-auto flex flex-col gap-0">
					<div className="p-6 pt-12">
						<SheetTitle className="font-['Josefin_Sans',sans-serif] font-normal text-[#0e100e] text-2xl leading-none">
							Filtros
						</SheetTitle>
						<p className="font-['Lato',sans-serif] text-[#353635] text-base leading-snug mt-2 max-w-[289px]">
							Filtra por categoría y colección para encontrar exactamente lo que necesitas.
						</p>
					</div>
					<div className="p-6">{filterPanelContent}</div>
				</SheetContent>
			</Sheet>
		</>
	);
}
