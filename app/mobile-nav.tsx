"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { YnsLink } from "@/components/yns-link";

type Collection = { id: string; slug: string; name: string };

const sheetLinkClass =
	"font-display text-base font-medium text-muted-foreground hover:text-foreground transition-colors";
const sheetActiveLinkClass = "text-foreground font-semibold";

export function MobileNav({ collections }: { collections: Collection[] }) {
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	return (
		<div className="flex items-center sm:hidden">
			<button
				type="button"
				aria-label="Open menu"
				onClick={() => setOpen(true)}
				className="flex items-center justify-center text-[#0E100E]"
			>
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
