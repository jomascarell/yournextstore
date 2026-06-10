"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { YNSMedia } from "@/lib/yns-media";

const POPULAR_SEARCHES = ["Anillos", "Pendientes", "Anillo Bombé", "Collar Soul", "Anillo Bicho Raro"];

type SearchItem = {
	id: string;
	name: string;
	slug: string;
	summary: string | null;
	image: string | null;
};

export function SearchInput() {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const open = useCallback(() => {
		setIsOpen(true);
		setQuery("");
		setResults([]);
	}, []);

	const close = useCallback(() => {
		setIsOpen(false);
		setQuery("");
		setResults([]);
	}, []);

	// Focus input when overlay opens
	useEffect(() => {
		if (isOpen) {
			const t = setTimeout(() => inputRef.current?.focus(), 50);
			return () => clearTimeout(t);
		}
	}, [isOpen]);

	// Body scroll lock while overlay is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	// Ctrl+K / Cmd+K toggle, Escape to close
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				isOpen ? close() : open();
			}
			if (e.key === "Escape" && isOpen) {
				close();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, open, close]);

	// Debounced real-time search
	useEffect(() => {
		if (!query.trim()) {
			setResults([]);
			setIsLoading(false);
			return;
		}
		setIsLoading(true);
		const timer = setTimeout(async () => {
			try {
				const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
				const data = await res.json();
				setResults(data.items ?? []);
			} catch {
				setResults([]);
			} finally {
				setIsLoading(false);
			}
		}, 200);
		return () => clearTimeout(timer);
	}, [query]);

	const navigate = useCallback(
		(url: string) => {
			close();
			router.push(url);
		},
		[close],
	);

	return (
		<>
			{/* Desktop trigger: search bar */}
			<button
				type="button"
				onClick={open}
				aria-label="Abrir buscador"
				className="hidden min-[900px]:flex relative items-center h-8.5 w-52.5 bg-[#616161]/20 cursor-text"
			>
				<Search className="absolute left-3 w-4 h-4 shrink-0 text-[#0E100E]" />
				<span className="pl-9 font-sans text-xs font-normal text-[#0E100E]/60">Buscar...</span>
			</button>

			{/* Mobile trigger: icon only */}
			<button
				type="button"
				onClick={open}
				aria-label="Abrir buscador"
				className="flex min-[900px]:hidden items-center justify-center text-[#0E100E]"
			>
				<Search className="w-5 h-5" />
			</button>

			{/* Overlay — portalled to document.body to escape the header's CSS transform
			    (translate-y-* on <header> makes fixed children relative to it, not the viewport) */}
			{isOpen &&
				createPortal(
					<>
						{/* Dark backdrop — desktop only (hidden by default on mobile) */}
						<div
							className="hidden min-[900px]:block fixed inset-0 z-40 bg-[#0E100E]/80"
							onClick={close}
							aria-hidden="true"
						/>

						{/* White search panel:
					    mobile/tablet → top-0 + bottom-0 = full viewport height
					    desktop       → bottom-auto overrides, panel is auto height */}
						<div className="fixed inset-x-0 top-0 bottom-0 z-50 bg-white overflow-y-auto min-[900px]:bottom-auto">
							{/* Row 1: search input + cancel button */}
							<div className="flex items-center gap-4 pt-10 px-4">
								<form
									className="flex flex-1 items-center gap-1 h-8.5 bg-[#616161]/20 px-3"
									onSubmit={(e) => {
										e.preventDefault();
										if (query.trim()) {
											navigate(`/search?q=${encodeURIComponent(query.trim())}`);
										}
									}}
								>
									<Search className="w-4 h-4 shrink-0 text-[#0E100E]" />
									<input
										ref={inputRef}
										type="search"
										value={query}
										onChange={(e) => setQuery(e.target.value)}
										placeholder="Buscar..."
										className="flex-1 bg-transparent font-sans text-sm font-normal text-[#0E100E] placeholder:text-[#0E100E]/60 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
									/>
								</form>
								<button
									type="button"
									onClick={close}
									className="shrink-0 rounded-3xl px-6 py-2.5 font-display text-base text-[#0E100E] transition-opacity hover:opacity-70"
								>
									Cancelar
								</button>
							</div>

							{/* Row 2: popular searches or real-time results */}
							<div className="px-4 pt-10 pb-10">
								{!query.trim() ? (
									<div className="flex flex-col gap-3">
										<p className="font-sans text-sm font-bold text-[#0E100E]">Búsquedas populares</p>
										{POPULAR_SEARCHES.map((s) => (
											<button
												key={s}
												type="button"
												onClick={() => navigate(`/search?q=${encodeURIComponent(s)}`)}
												className="text-left font-sans text-base text-[#0E100E] hover:underline"
											>
												{s}
											</button>
										))}
									</div>
								) : isLoading ? (
									<p className="font-sans text-sm text-[#0E100E]/60">Buscando...</p>
								) : results.length > 0 ? (
									<div className="flex flex-col gap-3">
										<p className="font-sans text-sm font-bold text-[#0E100E]">Resultados</p>
										{results.map((item) => (
											<button
												key={item.id}
												type="button"
												onClick={() => navigate(`/product/${item.slug}`)}
												className="flex items-center gap-3 text-left hover:opacity-70 transition-opacity"
											>
												<div className="relative shrink-0 w-12 h-16 bg-[#616161]/20 overflow-hidden">
													{item.image && (
														<YNSMedia
															src={item.image}
															alt={item.name}
															fill
															sizes="48px"
															className="object-cover"
														/>
													)}
												</div>
												<span className="font-sans text-base text-[#0E100E]">{item.name}</span>
											</button>
										))}
										<button
											type="button"
											onClick={() => navigate(`/search?q=${encodeURIComponent(query.trim())}`)}
											className="mt-2 text-left font-sans text-sm text-[#0E100E]/60 hover:underline"
										>
											Ver todos los resultados →
										</button>
									</div>
								) : (
									<p className="font-sans text-sm text-[#0E100E]/60">
										Sin resultados para &ldquo;{query}&rdquo;
									</p>
								)}
							</div>
						</div>
					</>,
					document.body,
				)}
		</>
	);
}
