import { supabase } from "@/components/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json({ error: "ID is required" }, { status: 400 });
	}

	const query = supabase.from("accordion").select("*").eq("id", id);
	const { data, error } = await query;

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(
		{
			data
		},
		{ status: 200 }
	);
}
