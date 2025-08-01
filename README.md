# 🛍️ Tokopedia Clone Frontend — Gotokopedia (Next.js 15)

Proyek ini merupakan kloning antarmuka Tokopedia yang dibangun menggunakan **Next.js 15 (App Router)** dan terintegrasi dengan backend dari repositori [api-gotokopedia](https://github.com/yogaprasetya22/api-gotokopedia).

---

## 🚀 Fitur Unggulan

- ✅ **Next.js 15 App Router**
- 🎨 Styling dengan **Tailwind CSS**
- ⚙️ Pengelolaan state & fetching data dengan **@tanstack/react-query**
- 🔐 Terintegrasi REST API backend (Go + PostgreSQL)
- 📁 Struktur proyek yang rapi dan scalable

---

## 🧰 Stack Teknologi

- **Next.js 15**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Axios + React Query**
- **ESLint & Prettier**
- **Modular foldering**

---

## 📦 Struktur Direktori

```bash
gotokopedia/
├── app/                # Halaman & routing (App Router)
├── components/         # Komponen UI (Navbar, Card, dll)
├── hooks/              # Custom hooks (API logic via React Query)
├── lib/                # Konfigurasi global (axios instance, util)
├── providers/          # React context & penyedia global (theme, query client, dsb)
├── store/              # Global state management (jika digunakan, ex: Zustand)
├── type/               # Deklarasi & tipe data TypeScript
├── public/             # Gambar & asset statis
├── .env.local          # File konfigurasi environment lokal
├── next.config.js      # Konfigurasi Next.js
└── tsconfig.json       # TypeScript config
````

---

## ⚙️ Setup & Instalasi

### 1. Clone Repositori

```bash
git clone https://github.com/yogaprasetya22/gotokopedia.git
cd gotokopedia
```

### 2. Install Dependency

```bash
npm install
# atau
yarn install
```

### 3. Konfigurasi Environment

Buat file `.env.local`:

```bash
touch .env.local
```

Isi dengan:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Ubah nilai URL sesuai alamat backend Go Anda.

---

## ▶️ Menjalankan Aplikasi

### Development mode

```bash
npm run dev
# atau
yarn dev
```

Buka di browser:

```
http://localhost:3000
```

### Production build

```bash
npm run build
npm start
```

---

## 📚 Perintah Tambahan

* **Linting**: `npm run lint`
* **Format dengan Prettier**: `npm run format`

---

## 🔗 Repositori Terkait

* 🔧 Backend API: [api-gotokopedia](https://github.com/yogaprasetya22/api-gotokopedia)

---