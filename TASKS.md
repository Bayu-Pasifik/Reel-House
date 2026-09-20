# Tasks — ReelHouse

## Done

- [x] Beranda dengan rail trending, popular, upcoming, now playing, dan highest rated.
- [x] Pencarian judul film dan filter discovery berdasarkan genre.
- [x] Halaman detail film dengan URL yang dapat dibagikan.
- [x] Trailer, credits, rekomendasi, galeri, ulasan, koleksi, provider Indonesia, sertifikasi rilis, dan link IMDb.
- [x] Build produksi dan pengabaian `.env` di Git.

## Next

- [x] Tambahkan state error dan empty state yang spesifik untuk setiap bagian detail yang datanya tidak tersedia.
- [x] Tambahkan halaman/flow "View all" untuk setiap rail, termasuk pagination.
- [x] Tambahkan pemilihan wilayah provider tontonan; Indonesia tetap menjadi default.
- [x] Tambahkan penyimpanan favorit lokal agar pengguna dapat membandingkan film sebelum menonton.
- [ ] Tambahkan kontrol aksesibilitas: fokus saat membuka trailer, tombol Escape untuk menutupnya, dan label yang ditinjau ulang.
- [ ] Uji alur beranda, detail, pencarian, dan hash route dengan data TMDB yang dimock.

## Later

- [ ] Evaluasi pencarian multi-entitas untuk sutradara dan pemeran.
- [ ] Tambahkan filter discovery lanjutan: tahun, rating, bahasa, dan provider.
- [ ] Evaluasi routing berbasis path jika deployment mendukung fallback SPA.
- [ ] Tambahkan analitik yang menghormati privasi setelah metrik produk disepakati.

## Definition of done untuk fitur baru

- Perilaku pengguna dan data endpoint yang dipakai terdokumentasi di PRD atau task terkait.
- Loading, data kosong, dan kegagalan endpoint memiliki perilaku yang jelas.
- `npm run build` dan pemeriksaan diff selesai.
- Checklist terkait diperbarui di dokumen ini sebelum commit dibuat.
- Satu fitur beserta pembaruan checklist dikomit dan dipush secara terpisah ke GitHub.
