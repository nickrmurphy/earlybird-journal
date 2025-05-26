import tailwindcss from "@tailwindcss/vite";
import solid from "vite-plugin-solid";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => ({
	plugins: [solid(), tailwindcss()],
	optimizeDeps: {
		exclude: ["@electric-sql/pglite"]
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
}));
