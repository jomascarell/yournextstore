import "@/app/globals.css";

import { Info } from "lucide-react";
import type { Metadata } from "next";
import { Josefin_Sans, Lato } from "next/font/google";
import { Suspense } from "react";
import { CartProvider } from "@/app/cart/cart-context";
import { CartSidebar } from "@/app/cart/cart-sidebar";
import { CartButton } from "@/app/cart-button";
import { Footer } from "@/app/footer";
import { HeaderNav } from "@/app/header-nav";
import { MobileNavServer } from "@/app/mobile-nav-server";
import { Navbar } from "@/app/navbar";
import { SearchInput } from "@/app/search-input";
import { ErrorOverlayRemover, NavigationReporter } from "@/components/devtools";
import { ReferralBadge } from "@/components/referral-badge";
import { YnsLink } from "@/components/yns-link";
import { commerce, getStoreFaviconUrl, meGetCached } from "@/lib/commerce";
import { getCartCookieJson } from "@/lib/cookies";
import { StoreJsonLd } from "@/lib/json-ld";

const josefinSans = Josefin_Sans({
	variable: "--font-josefin-sans",
	subsets: ["latin"],
	weight: ["400", "700"],
});

const lato = Lato({
	variable: "--font-lato",
	subsets: ["latin"],
	weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
	const me = await meGetCached();
	const storeName = me.store.settings?.storeName || "Your Next Store";
	const faviconUrl = getStoreFaviconUrl(me.store.settings) ?? "/logo.svg";

	return {
		title: storeName,
		description: me.store.settings?.storeDescription || "Your next e-commerce store",
		icons: {
			icon: [
				{ url: faviconUrl, sizes: "any", type: "image/svg+xml" },
				{ url: faviconUrl, sizes: "192x192", type: "image/png" },
			],
			apple: [{ url: faviconUrl, sizes: "180x180" }],
			shortcut: faviconUrl,
		},
		manifest: "/manifest.webmanifest",
	};
}

async function getInitialCart() {
	const cartCookie = await getCartCookieJson();

	if (!cartCookie?.id) {
		return { cart: null, cartId: null };
	}

	try {
		const cart = await commerce.cartGet({ cartId: cartCookie.id });
		return { cart: cart ?? null, cartId: cartCookie.id };
	} catch {
		return { cart: null, cartId: cartCookie.id };
	}
}

async function CartProviderWrapper({ children }: { children: React.ReactNode }) {
	const [{ cart, cartId }, me] = await Promise.all([getInitialCart(), meGetCached()]);
	const storeName = me.store.settings?.storeName || "Your Next Store";

	return (
		<CartProvider initialCart={cart} initialCartId={cartId}>
			<div className="flex min-h-screen flex-col">
				<HeaderNav>
					<div className="max-w-7xl mx-auto px-4 lg:px-20">
						<div className="flex items-center justify-between h-[53px]">
							<YnsLink
								prefetch={"eager"}
								href="/"
								className="font-display text-xl font-bold text-black group-data-[dark=true]/header:text-white transition-colors"
							>
								{storeName}
							</YnsLink>
							<Navbar />
							<div className="flex items-center gap-2">
								<Suspense>
									<SearchInput />
								</Suspense>
								<div className="hidden sm:flex items-center gap-2">
									<YnsLink
										href="/faq"
										aria-label="Information"
										className="flex items-center justify-center text-black group-data-[dark=true]/header:text-white transition-colors"
									>
										<Info className="w-5 h-5" />
									</YnsLink>
									<CartButton />
								</div>
								<MobileNavServer />
							</div>
						</div>
					</div>
				</HeaderNav>
				<div className="flex-1">{children}</div>
				<Footer />
				<ReferralBadge />
			</div>
			<CartSidebar />
		</CartProvider>
	);
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const env = process.env.VERCEL_ENV || "development";

	return (
		<html lang="en" className={`${josefinSans.variable} ${lato.variable}`}>
			<body className="antialiased">
				<Suspense>
					<StoreJsonLd />
				</Suspense>
				<Suspense>
					<CartProviderWrapper>{children}</CartProviderWrapper>
				</Suspense>
				{env === "development" && (
					<>
						<NavigationReporter />
						<ErrorOverlayRemover />
					</>
				)}
			</body>
		</html>
	);
}
