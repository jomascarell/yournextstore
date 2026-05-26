import { type NextRequest, NextResponse } from "next/server";
import { commerce } from "@/lib/commerce";

export async function GET(request: NextRequest) {
	const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
	if (!q) {
		return NextResponse.json({ items: [] });
	}
	const result = await commerce.search({ query: q, limit: 6 });
	return NextResponse.json(result);
}
