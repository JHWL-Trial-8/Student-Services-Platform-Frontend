/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // 扫描根目录的 HTML 文件
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 扫描 src 目录下所有 Vue, JS, TS 等文件
  ],
  theme: {
    extend: {}, // 你可以在这里扩展默认的主题配置
  },
  plugins: [],
}
