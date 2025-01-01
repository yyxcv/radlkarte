import {defineConfig} from 'vite'
import replaceGeoJsonInHtml from './vite-plugin-replace-geojson-in-html'

export default defineConfig({
  root: 'src',
  assetsInclude: ['**/*.geojson', '**/*.svg'],
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
  },
  plugins: [replaceGeoJsonInHtml(),],
  // server: {
  //   proxy: {
  //     'sprite': {
  //       target: 'http://127.0.0.1:8080/',
  //       changeOrigin: true,
  //     },
  //   },
  // },
})
