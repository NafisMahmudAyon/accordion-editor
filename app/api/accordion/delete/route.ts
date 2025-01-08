import { supabase } from "@/components/supabaseClient";
import { NextResponse } from "next/server";


export async function DELETE(request: Request) {
	const { id } = await request.json();

	if (!id) {
		return NextResponse.json({ error: "ID is required" }, { status: 400 });
	}

	const {  error } = await supabase
		.from("accordion")
		.delete()
		.eq("id", id)
		.eq("status", "trash");

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ message: "Accordion deleted successfully" });
}
