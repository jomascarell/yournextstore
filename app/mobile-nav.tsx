"use client";

import { Info, Menu, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/app/cart/cart-context";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { YnsLink } from "@/components/yns-link";

type Collection = { id: string; slug: string; name: string };

const sheetLinkClass =
	"font-display text-base font-medium text-muted-foreground hover:text-foreground transition-colors";
const sheetActiveLinkClass = "text-foreground font-semibold";
const iconClass =
	"flex items-center justify-center text-black group-data-[dark=true]/header:text-white transition-colors";

export function MobileNav({ collections }: { collections: Collection[] }) {
	const [open, setOpen] = useState(false);
	const { openCart } = useCart();
	const close = () => setOpen(false);

	return (
		<div className="flex items-center gap-8 sm:hidden">
			<div className="flex items-center gap-4">
				<YnsLink href="/search" aria-label="Search" className={iconClass}>
					<Search className="w-5 h-5" />
				</YnsLink>
				<YnsLink href="/faq" aria-label="Information" className={iconClass}>
					<Info className="w-5 h-5" />
				</YnsLink>
				<button type="button" aria-label="Cart" onClick={openCart} className={iconClass}>
					<ShoppingBag className="w-5 h-5" />
				</button>
			</div>
			<button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className={iconClass}>
				<Menu className="w-6 h-6" />
			</button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent aria-describedby={undefined} side="left">
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
					</SheetHeader>
					<nav className="flex flex-col gap-4 px-4">
						<YnsLink
							href="/"
							exactHrefMatch
							activeClassName={sheetActiveLinkClass}
							className={sheetLinkClass}
							onClick={close}
						>
							Home
						</YnsLink>
						<YnsLink
							href="/products"
							activeClassName={sheetActiveLinkClass}
							className={sheetLinkClass}
							onClick={close}
						>
							Products
						</YnsLink>
						{collections.map((collection) => (
							<YnsLink
								key={collection.id}
								href={`/collection/${collection.slug}`}
								activeClassName={sheetActiveLinkClass}
								className={sheetLinkClass}
								onClick={close}
							>
								{collection.name}
							</YnsLink>
						))}
					</nav>
				</SheetContent>
			</Sheet>
		</div>
	);
}
