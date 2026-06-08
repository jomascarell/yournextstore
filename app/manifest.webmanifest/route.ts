import { NextResponse } from "next/server";
import { getStoreFaviconUrl, meGetCached } from "@/lib/commerce";

export async function GET() {
	let storeName = "Your Next Store";
	let icon192 = "/PWA_PWA-192.png";
	let icon512 = "/PWA_PWA-512.png";

	try {
		const me = await meGetCached(process.env.YNS_API_KEY);
		storeName = me.store.settings?.storeName || storeName;
		const remoteIcon = getStoreFaviconUrl(me.store.settings);
		if (remoteIcon) {
			icon192 = remoteIcon;
			icon512 = remoteIcon;
		}
	} catch {
		// serve fallback manifest if store data is unavailable
	}

	const manifest = {
		name: storeName,
		short_name: storeName,
		start_url: "/",
		display: "standalone" as const,
		background_color: "#ffffff",
		theme_color: "#000000",
		icons: [
			{
				src: icon192,
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: icon512,
				sizes: "512x512",
				type: "image/png",
			},
		],
	};

	return NextResponse.json(manifest, {
		headers: {
			"Content-Type": "application/manifest+json",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
