import * as path from "path";
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/index.ts"),
			name: "ubrow",
			formats: ["es", "umd", "cjs", "iife"]
		}
	},
})
