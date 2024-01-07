# Belajar MERN - Frontend

## Install Depedencies

Install semua depedencies yang dibutuhkan

```bash
npm install
```

## Jalanakan _Dev Server_

Jalankan Development Server,

```bash
npm start dev
```

dan buka `https://127.0.0.1:300` di browser kalian.

## Depedencies

1. [VITE](https://vitejs.dev/guide/)

```bash
npm create vite@latest
```

2. [Axios](https://axios-http.com/docs/intro)

```bash
npm install axios
```

3. [TailwindCSS](https://tailwindcss.com/docs/guides/vite)

   - Install TailwindCSS
     ```bash
     npm install -D tailwindcss postcss autoprefixer
     npx tailwindcss init -p
     ```
   - Konfigurasi Path

     ```javascript
     //tailwind.config.js

     // @type {import('tailwindcss').Config}
     export default {
     	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     	theme: {
     		extend: {},
     	},
     	plugins: [],
     };
     ```

   - Tamabhkan pada file _index.css_

     ```css
     /*index.css*/

     @tailwind base;
     @tailwind components;
     @tailwind utilities;

     /*all code*/
     ```
