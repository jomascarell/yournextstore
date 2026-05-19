"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export function HeaderNav({ children }: { children: ReactNode }) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 4);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			data-dark={!scrolled}
			className="group/header sticky top-0 z-50 bg-white data-[dark=true]:bg-black transition-colors duration-300"
		>
			{children}
		</header>
	);
}
