import { supabase } from "@/components/supabaseClient";
import { NextResponse } from "next/server";


export async function PATCH(request: Request) {
	const { ids, status } = await request.json();

	if (!ids || !Array.isArray(ids) || !status) {
		return NextResponse.json({ error: "Invalid input" }, { status: 400 });
	}

	const { data, error } = await supabase
		.from("accordion")
		.update({ status })
		.in("id", ids);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}
