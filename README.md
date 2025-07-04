# 🧾 API My Blog(Express + MongoDB)

Project ini adalah RESTful API sederhana menggunakan **Express.js** dan **MongoDB**, dengan fitur:

- Autentikasi user & login
- User: CRUD
- Artikel: CRUD + status published/draft
- Page View Tracking per artikel
- Aggregasi statistik (hourly, daily, monthly)

---

## 🚀 Langkah Menjalankan Project di Lokal

### 1. Clone Repo

```bash
git clone https://github.com/username/nama-repo.git
cd nama-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variable

Buat file `.env` di root folder, contoh:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/my_blog
JWT_SECRET=mytokenblogapi111
```

### 4. Jalankan MongoDB (Pastikan MongoDB sudah aktif di lokal)

### 5. Import Dummy Data

Jika kamu punya folder `./dump`, jalankan:

```bash
mongorestore --db=my_blog ./dump/my_blog
```

---

## 🚪 Testing API

Gunakan aplikasi Postman, Insomnia, atau curl.

### 🔗 Dokumentasi API Postman

📄 [Klik di sini untuk membuka dokumentasi Postman](https://web.postman.co/workspace/My-Workspace~998bec47-036a-4ec3-8f83-e5cbdc26ccdf/collection/919336-d5e1e3ce-86f3-45f3-aae3-3202d78699fd?action=share&source=copy-link&creator=919336)


---

## 📂 Backup & Restore MongoDB

### ✅ Export (Backup) database

```bash
mongodump --db=my_blog --out=./dump
```

> Akan membuat folder: `./dump/myapp`

### ✅ Import (Restore) database

```bash
mongorestore --db=my_blog ./dump/my_blog
```

---

## ⚠️ Jika `mongodump` / `mongorestore` tidak dikenali

Pastikan kamu sudah install **MongoDB Database Tools** dari:

🔗 [https://www.mongodb.com/try/download/database-tools](https://www.mongodb.com/try/download/database-tools)

Lalu tambahkan folder `/bin` ke `PATH` Windows:

```
C:\Program Files\MongoDB\Database Tools\bin
```

---

## 📁 Struktur Proyek

```
.
├── controllers/
├── models/
├── routes/
├── middlewares/
├── dump/ 
├── .env
├── index.js
└── README.md


```

---
