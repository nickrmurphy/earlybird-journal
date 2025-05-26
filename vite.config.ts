import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig(() => ({
	plugins: [
		solid(),
		tailwindcss(),
		{
			name: 'configure-response-headers',
			configureServer: (server) => {
				server.middlewares.use((_req, res, next) => {
					res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
					res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
					next();
				});
			},
		},
	],
	optimizeDeps: {
		exclude: ["sqlocal"],
	},
	worker: {
		format: "es",
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
}));
