import { supabase } from "@/components/supabaseClient";
import { NextResponse } from "next/server";


export async function PATCH(request: Request) {
	const { id, status, content, title } = await request.json();

	if (!id || (!status && !content && !title)) {
		return NextResponse.json(
			{ error: "ID and either status or content are required" },
			{ status: 400 }
		);
	}

	// Ensure `content` is valid JSON if provided
	if (content) {
		try {
			JSON.stringify(content);
		} catch {
			return NextResponse.json(
				{ error: "Invalid JSON content" },
				{ status: 400 }
			);
		}
	}

	const { data, error } = await supabase
		.from("accordion")
		.update({ status, content, title })
		.eq("id", id);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data);
}
