import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { YnsLink } from "@/components/yns-link";
import { commerce } from "@/lib/commerce";
import { FilterPanel } from "./products-filter-panel";
import { ProductsInteractive } from "./products-interactive";
import { ProductsPagination } from "./products-pagination";

const PRODUCTS_PER_PAGE = 12;

const sortOptions = [
	{ value: "newest", label: "Más recientes", orderBy: "createdAt", orderDirection: "desc" },
	{ value: "price-asc", label: "Precio: de menor a mayor", orderBy: "price", orderDirection: "asc" },
	{ value: "price-desc", label: "Precio: de mayor a menor", orderBy: "price", orderDirection: "desc" },
	{ value: "name", label: "Nombre: A–Z", orderBy: "name", orderDirection: "asc" },
] as const;

export const metadata: Metadata = {
	title: "All Products — Your Next Store",
	description: "Browse our complete product collection.",
};

async function getCategories() {
	"use cache";
	cacheLife("hours");
	return commerce.categoriesBrowse({ active: true });
}

async function ProductList({
	page,
	sort,
	category,
	query,
}: {
	page?: string;
	sort?: string;
	category?: string;
	query?: string;
}) {
	"use cache";
	cacheLife("minutes");

	const currentPage = Math.max(1, Number(page) || 1);
	const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;
	const sortOption = sortOptions.find((s) => s.value === sort) ?? sortOptions[0];

	const result = await commerce.productBrowse({
		active: true,
		limit: PRODUCTS_PER_PAGE,
		offset,
		orderBy: sortOption.orderBy,
		orderDirection: sortOption.orderDirection,
		...(category ? { category } : {}),
		...(query ? { query } : {}),
	});

	const totalPages = Math.ceil(result.meta.count / PRODUCTS_PER_PAGE);

	if (result.data.length === 0) {
		return (
			<div className="py-24 text-center">
				<p className="text-lg text-muted-foreground">
					{category || query
						? "No se encontraron productos con estos filtros."
						: "No hay productos disponibles todavía."}
				</p>
				{(category || query) && (
					<YnsLink href="/products" className="mt-4 inline-block text-sm font-bold text-[#050605] underline">
						Ver todos los productos
					</YnsLink>
				)}
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-12">
				{result.data.map((product, i) => (
					<ProductCard key={product.id} product={product} priority={i < 3} />
				))}
			</div>
			<ProductsPagination
				currentPage={currentPage}
				totalPages={totalPages}
				sort={sort}
				category={category}
				query={query}
			/>
		</>
	);
}

/** Skeleton shown while the product grid is streaming in */
function ProductGridSkeleton() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-12">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={`skeleton-${i}`} className="flex flex-col gap-3">
					<div className="aspect-[3/5] bg-secondary animate-pulse" />
					<div className="space-y-2">
						<div className="h-5 w-3/4 bg-secondary rounded animate-pulse" />
						<div className="h-4 w-1/4 bg-secondary rounded animate-pulse" />
					</div>
				</div>
			))}
		</div>
	);
}

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string; sort?: string; category?: string; query?: string }>;
}) {
	const { page, sort, category, query } = await searchParams;

	// Resolve category display name for the active filter chip
	const categoriesResult = await getCategories();
	const currentCategoryName = categoriesResult.data.find((c) => c.slug === category)?.name;

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
			{/* Page header */}
			<div className="mb-10">
				<h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Todos los productos</h1>
				<p className="mt-2 text-muted-foreground">Explora nuestra colección completa</p>
			</div>

			<div className="flex gap-8 items-start">
				{/* Desktop filter sidebar */}
				<aside className="hidden lg:block w-[262px] shrink-0">
					<Suspense fallback={<div className="h-64 border border-[#bcbcbc] animate-pulse bg-secondary/20" />}>
						<FilterPanel currentCategory={category} currentSort={sort} />
					</Suspense>
				</aside>

				{/* Main content */}
				<div className="flex-1 min-w-0">
					{/* Interactive toolbar: sort, filter button, chips, mobile drawer */}
					<ProductsInteractive
						currentSort={sort}
						currentCategory={category}
						currentCategoryName={currentCategoryName}
						filterPanelContent={
							<FilterPanel currentCategory={category} currentSort={sort} showTitle={false} />
						}
					/>

					{/* Product grid (streams in) */}
					<Suspense fallback={<ProductGridSkeleton />}>
						<ProductList page={page} sort={sort} category={category} query={query} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
