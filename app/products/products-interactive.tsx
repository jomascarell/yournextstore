"use client";

import { SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const sortOptions = [
	{ value: "newest", label: "Más recientes" },
	{ value: "price-asc", label: "Precio: de menor a mayor" },
	{ value: "price-desc", label: "Precio: de mayor a menor" },
	{ value: "name", label: "Nombres: A-Z" },
] as const;

type SelectedCategory = { slug: string; name: string };

type Props = {
	currentSort?: string;
	currentCategory?: string;
	selectedCategories: SelectedCategory[];
	filterPanelContent: React.ReactNode;
};

export function ProductsInteractive({
	currentSort,
	currentCategory,
	selectedCategories,
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

	function handleRemoveCategory(slugToRemove: string) {
		const remaining = selectedCategories
			.filter((c) => c.slug !== slugToRemove)
			.map((c) => c.slug)
			.join(",");
		router.push(buildUrl({ category: remaining || null }));
	}

	function handleClearAll() {
		router.push(buildUrl({ category: null }));
	}

	const activeSort = currentSort ?? "newest";
	const hasActiveFilters = selectedCategories.length > 0;

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
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => setDrawerOpen(true)}
						className="lg:hidden shrink-0"
					>
						<SlidersHorizontal className="size-4" />
						Filtrar
					</Button>
				</div>

				{/* Row 2: "no filters" note or active chips */}
				{!hasActiveFilters ? (
					<p className="text-sm font-['Lato',sans-serif] text-[#A8A9A8]">No se han aplicado filtros</p>
				) : (
					<div className="flex items-center gap-2 flex-wrap">
						{selectedCategories.map((cat) => (
							<div
								key={cat.slug}
								className="border border-[#bcbcbc] flex items-center gap-2 px-2.5 py-0.5 rounded-full"
							>
								<span className="text-sm text-[#0e100e] font-['Lato',sans-serif]">{cat.name}</span>
								<button
									type="button"
									onClick={() => handleRemoveCategory(cat.slug)}
									aria-label={`Eliminar filtro ${cat.name}`}
								>
									<X className="size-2.5 text-[#0e100e]" />
								</button>
							</div>
						))}
						<Button type="button" variant="link" size="sm" onClick={handleClearAll}>
							Borrar todo
						</Button>
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
