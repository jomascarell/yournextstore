"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function HeaderNav({ children }: { children: ReactNode }) {
	const [visible, setVisible] = useState(true);
	const [shadowed, setShadowed] = useState(false);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const onScroll = () => {
			const currentY = window.scrollY;
			if (currentY <= 0) {
				setVisible(true);
				setShadowed(false);
			} else if (currentY > lastScrollY.current) {
				setVisible(false);
			} else {
				setVisible(true);
				setShadowed(true);
			}
			lastScrollY.current = currentY;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={`sticky top-0 z-50 bg-white transition-[transform,box-shadow] duration-300 ${
				visible ? "translate-y-0" : "-translate-y-full"
			} ${shadowed && visible ? "shadow-[0_1px_2px_rgba(0,0,0,0.6)]" : ""}`}
		>
			{children}
		</header>
	);
}
