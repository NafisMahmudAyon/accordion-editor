import { NextRequest } from "next/server";
import { supabase } from "@/components/supabaseClient";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params;
	// const { searchParams } = new URL(request.url);
	// const title = searchParams.get("title");
	// const content = searchParams.get("content");

	if (!id) {
		return new Response("<h1>ID is required</h1>", {
			status: 400,
			headers: { "Content-Type": "text/html" },
		});
	}

	// Fetch the accordion data
	const { data: accordion, error } = await supabase
		.from("accordion")
		.select("*")
		.eq("id", id)
		.single();

	if (error || !accordion) {
		return new Response("<h1>Accordion not found</h1>", {
			status: 404,
			headers: { "Content-Type": "text/html" },
		});
	}

	// Use the provided `title`, `content`, and `type` if available
	const outputTitle = title || accordion.title;
	const outputContent = content || accordion.content;

	// Generate the HTML content
	const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${outputTitle}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          line-height: 1.6;
          background-color: #f9f9f9;
          color: #333;
        }
        .accordion {
          max-width: 800px;
          margin: 20px auto;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .accordion-item {
          border-bottom: 1px solid #ddd;
        }
        .accordion-title {
          background-color: #f4f4f4;
          padding: 15px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .accordion-title:hover {
          background-color: #eaeaea;
        }
        .accordion-content {
          padding: 15px;
          display: none;
        }
        .accordion-content.open {
          display: block;
        }
      </style>
    </head>
    <body>
      <div class="accordion">
        <div class="accordion-item">
          <div class="accordion-title">${outputTitle}</div>
          <div class="accordion-content">${outputContent}</div>
        </div>
      </div>
      <script>
        document.querySelectorAll(".accordion-title").forEach(title => {
          title.addEventListener("click", () => {
            const content = title.nextElementSibling;
            content.classList.toggle("open");
          });
        });
      </script>
    </body>
    </html>
  `;

	return new Response(html, {
		status: 200,
		headers: { "Content-Type": "text/html" },
	});
}
