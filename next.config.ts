// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/api/:path*", // Apply to all API routes
				headers: [
					{ key: "Access-Control-Allow-Origin", value: "*" }, // Change to specific origin for production
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, DELETE, OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type, Authorization, X-Requested-With",
					},
					{ key: "Access-Control-Allow-Credentials", value: "true" },
				],
			},
		];
	},
};

export default nextConfig;

