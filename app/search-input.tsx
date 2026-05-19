"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";

export function SearchInput() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = useCallback((e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const query = formData.get("q");
		if (typeof query === "string" && query.trim()) {
			router.push(`/search?q=${encodeURIComponent(query.trim())}`);
		}
	}, []);

	return (
		<form onSubmit={handleSubmit} className="hidden sm:block">
			<div className="relative flex items-center h-8.5 w-52.5 rounded-full border border-[#aaaaaa] group-data-[dark=true]/header:border-white/30 bg-transparent transition-colors">
				<Search className="absolute left-3 w-4 h-4 shrink-0 text-[#454545] group-data-[dark=true]/header:text-white/60 transition-colors" />
				<input
					ref={inputRef}
					type="search"
					name="q"
					placeholder="Buscar..."
					defaultValue={searchParams.get("q") ?? ""}
					className="h-full w-full rounded-full bg-transparent pl-9 pr-3 font-sans text-xs font-normal text-[#454545] placeholder:text-[#454545] group-data-[dark=true]/header:text-white group-data-[dark=true]/header:placeholder:text-white/50 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
				/>
			</div>
		</form>
	);
}
