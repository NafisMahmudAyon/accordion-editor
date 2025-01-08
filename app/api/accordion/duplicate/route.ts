import { supabase } from "@/components/supabaseClient";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
	const { id } = await request.json();

	if (!id) {
		return NextResponse.json({ error: "ID is required" }, { status: 400 });
	}

	const { data: original, error: fetchError } = await supabase
		.from("accordion")
		.select("*")
		.eq("id", id)
		.single();

	if (fetchError || !original) {
		return NextResponse.json({ error: "Accordion not found" }, { status: 404 });
	}

	const { user_id, title, content, status } = original;

	const { data, error } = await supabase
		.from("accordion")
		.insert([{ user_id, title: `${title} (Copy)`, content, status }]);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}
