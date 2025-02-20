import { supabase } from "@/components/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const id = searchParams.get("id");
	const slug = searchParams.get("slug");

	// if (!id || !slug) {
	// 	return NextResponse.json({ error: "ID is requireda" }, { status: 400 });
	// }

	let query;

	if (id) {
		query = supabase.from("accordion").select("*").eq("id", id);
	}
	if (slug) {
		query = supabase.from("accordion").select("*").eq("short_id", slug);
	}

	if (!query) {
		return NextResponse.json({ error: "ID is required" }, { status: 400 });
	}

	const { data, error } = await query;

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(
		{
			data,
		},

		{ status: 200 }
	);
}
