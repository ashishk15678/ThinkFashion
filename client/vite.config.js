// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://e-commerce-app-pearl-six.vercel.app',
//         secure: false,
//       },
//     },
//   },

//   plugins: [react()],
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
