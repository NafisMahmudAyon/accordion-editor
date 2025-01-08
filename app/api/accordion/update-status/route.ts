import { supabase } from "@/components/supabaseClient";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
	const { id, status } = await request.json();

	if (!id || !status) {
		return NextResponse.json(
			{ error: "ID and status are required" },
			{ status: 400 }
		);
	}

	const { data, error } = await supabase
		.from("accordion")
		.update({ status })
		.eq("id", id);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}
