import { supabase } from "@/components/supabaseClient";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { user_id, title, content, status } = await request.json();

	// Validate required fields
	if (!user_id || !title || !content || !status) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 }
		);
	}

	// Ensure `content` is valid JSON
	if (typeof content !== "object" || content === null) {
		console.error("Invalid content format:", content);
		return NextResponse.json(
			{ error: "Invalid content format. Must be a JSON object." },
			{ status: 400 }
		);
	}

	try {
		// create short id 
		const shortId = nanoid(6)
		// Insert into the `accordion` table
		const { data, error } = await supabase
			.from("accordion")
			.insert([{ user_id, title, content, status, short_id: shortId }]);

		if (error) {
			console.error("Supabase error:", error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		// Return the created record
		return NextResponse.json(data, { status: 201 });
	} catch (error) {
		console.error("Unexpected server error:", error);
		return NextResponse.json(
			{ error: "An unexpected error occurred" },
			{ status: 500 }
		);
	}
}
