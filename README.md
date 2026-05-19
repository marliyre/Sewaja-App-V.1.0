# Sewaja App

## Sewa Barang Jadi Lebih Mudah

Sewaja App adalah prototype aplikasi sewa barang berbasis mobile yang dirancang untuk membantu pengguna mencari, menyewa, dan menawarkan barang secara praktis.

Prototype ini berfokus pada validasi konsep, desain UI/UX, alur penggunaan, dan materi presentasi sebelum masuk ke tahap frontend dan backend production.

Ini adalah sebuah Proyek [Expo](https://expo.dev) yang dibuat dengan [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install Node.js + npm
   - Kalau belum ada:
   - Node.js + npm
   [👉 Download:](https://nodejs.org)
   (ini sudah termasuk npm)
   - Git
   [👉 Download:](https://git-scm.com)

   Cek sudah terpasang:
   ```bash
   node -v
   npm -v
   git --version
   ```

2. Clone project from Github
   ```bash
   git clone https://github.com/marliyre/Sewaja-App-V.1.0.git
   ```
   Masuk foldernya:
   ```bash
   cd Sewaja-App-V.1.0
   ```
   
3. Install dependencies

   ```bash
   npm install
   ```

4. Start the app

   ```bash
   npx expo start
   ```

Pada tampilan hasil, Anda akan menemukan opsi untuk membuka aplikasi dalam sebuah

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), lingkungan uji coba terbatas untuk mencoba pengembangan aplikasi dengan Expo

Anda dapat mulai mengembangkan aplikasi dengan mengedit berkas-berkas di dalam direktori **app**. Proyek ini menggunakan [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

Jika Anda sudah siap, jalankan:

```bash
npm run reset-project
```

Perintah ini akan memindahkan kode awal ke direktori **app-example** dan membuat direktori **app** kosong tempat Anda dapat mulai mengembangkan aplikasi.

## Project Goal

- Menampilkan konsep aplikasi sewa barang yang mudah dipahami.
- Menunjukkan alur pengguna dari login sampai booking.
- Membuat desain UI/UX modern, clean, dan mobile-first.
- Menyiapkan dokumentasi untuk GitHub, presentasi, dan validasi ide.

## Main Features

- Login dan register
- Pencarian barang
- Kategori barang
- Detail informasi barang
- Booking/sewa barang
- Chat antar pengguna
- Profil pengguna
- Wishlist dan riwayat sewa
- Upload barang

## Prototype Pages

- Splash Screen
- Login & Register
- Home Page
- Kategori Page
- Detail Barang Page
- Booking Page
- Konfirmasi Booking Page
- Chat Page
- Profil Page
- Upload Barang Page

## Main User Flow

1. User membuka aplikasi.
2. User login atau register.
3. User mencari barang dari Home.
4. User memilih kategori.
5. User melihat detail barang.
6. User memilih tanggal dan durasi sewa.
7. User melakukan booking.
8. User membuka chat dengan pemilik barang.
9. User melihat riwayat pada profil.

## Design Direction

- Primary Mint: `#10B981`
- Dark Mint: `#047857`
- Light Mint: `#ECFDF5`
- White: `#FFFFFF`
- Soft Mint Background: `#F0FDF4`
- Font: Inter atau Poppins
- Style: modern, eco-friendly, fresh, hemat, sociopreneur, rounded card, soft shadow, clean layout

## Project Status

Proyek saat ini sudah menggunakan frontend berbasis React + TypeScript (.tsx).

Aplikasi dapat dijalankan melalui development server menggunakan tooling seperti Expo.

Fokus pengembangan berikutnya adalah:
- Validasi user flow
- Penyempurnaan UI/UX
- Refactoring struktur komponen
- Persiapan integrasi API atau backend jika dibutuhkan

## Future Development

- Authentication system
- Real-time notification
- Payment gateway
- Search and filter
- Database integration
- Rating and review
- Admin dashboard
- Mobile frontend implementation

## Purpose

Sewaja dibuat untuk mendukung budaya berbagi barang, mengurangi konsumsi berlebih, dan membantu pengguna mendapatkan akses kebutuhan dengan lebih hemat.
