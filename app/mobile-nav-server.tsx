import { cacheLife } from "next/cache";
import { try_ } from "safe-try";
import { MobileNav } from "@/app/mobile-nav";
import { commerce } from "@/lib/commerce";

export async function MobileNavServer() {
	"use cache";
	cacheLife("hours");
	const [, result] = await try_(commerce.collectionBrowse({ limit: 5 }));
	return <MobileNav collections={result?.data ?? []} />;
}
