import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'
import replaceGeoJsonInHtml from './vite-plugin-replace-geojson-in-html'

export default defineConfig({
  root: 'src',
  assetsInclude: ['**/*.geojson', '**/*.svg'],
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
  },
  plugins: [
    tailwindcss(),
    replaceGeoJsonInHtml()
  ],
  server: {
    // proxy: {
    //   'sprite': {
    //     target: 'http://127.0.0.1:8080/',
    //     changeOrigin: true,
    //   },
    // },
  },
})
