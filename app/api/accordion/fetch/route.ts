import { supabase } from "@/components/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const user_id = searchParams.get("user_id");
	const status = searchParams.get("status");
	const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
	const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 items per page

	if (!user_id) {
		return NextResponse.json({ error: "User ID is required" }, { status: 400 });
	}

	// Calculate offset for pagination
	const offset = (page - 1) * limit;

	// Base query
	let query = supabase
		.from("accordion")
		.select("*", { count: "exact" })
		.eq("user_id", user_id);

	// Filter by status if provided
	if (status) {
		query = query.eq("status", status);
	}

	// Add pagination
	query = query.range(offset, offset + limit - 1);

	// Execute the query
	const { data, error, count } = await query;

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	// Calculate total pages
	const totalPages = Math.ceil((count || 0) / limit);

	return NextResponse.json(
		{
			data,
			meta: {
				total: count || 0,
				totalPages,
				currentPage: page,
				limit,
			},
		},
		{ status: 200 }
	);
}
