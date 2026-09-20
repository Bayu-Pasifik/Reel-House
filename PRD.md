# PRD — ReelHouse

## Ringkasan

ReelHouse adalah aplikasi informasi dan discovery film untuk publik yang ingin menilai film sebelum menonton di bioskop, streaming, sewa, atau beli digital. Data film disediakan oleh TMDB.

## Masalah

Sebelum menonton, pengguna sering harus berpindah antara beberapa sumber untuk mengetahui premis film, trailer, pemain, rating, ketersediaan streaming, dan film terkait. Informasi tersebut perlu tersedia dalam alur yang ringkas tanpa mengorbankan kedalaman detail.

## Tujuan produk

1. Membantu pengguna menemukan film berdasarkan tren, popularitas, peringkat, waktu tayang, genre, atau pencarian judul.
2. Membantu pengguna membuat keputusan menonton melalui halaman detail yang lengkap.
3. Menunjukkan pilihan menonton untuk wilayah Indonesia saat data tersedia.

## Pengguna utama

Masyarakat umum yang mencari informasi film sebelum menonton, baik di bioskop maupun layanan digital.

## Ruang lingkup versi saat ini

### Beranda

- Spotlight rilis terbaru dengan fallback trending.
- Rail trending, now playing, popular, highest rated, dan upcoming.
- Pencarian judul film.
- Filter discovery menurut genre.

### Halaman detail (`#movie/{id}`)

- Metadata inti: tahun, rating TMDB, durasi, status, sertifikasi rilis, dan link IMDb bila tersedia.
- Sinopsis, tagline, trailer YouTube, galeri visual, pemeran, sutradara, ulasan, koleksi/franchise, rekomendasi, dan provider streaming Indonesia.
- URL dapat dibagikan dan mendukung navigasi browser Back/Forward.

## Kriteria keberhasilan

- Pengguna dapat membuka detail film dari seluruh rail dan hasil pencarian.
- Pengguna dapat menemukan trailer atau informasi ketersediaan menonton bila TMDB menyediakannya.
- Halaman detail dapat dibuka kembali melalui URL hash film.
- Build produksi (`npm run build`) berhasil.
- Metrik agregat lokal mencatat pencarian, buka detail, dan buka trailer tanpa mengirim data pengguna ke layanan eksternal.

## Di luar ruang lingkup saat ini

- Akun pengguna, favorit tersinkronisasi, riwayat tontonan, atau notifikasi.
- Tiket bioskop atau transaksi rental/pembelian langsung.
- Data provider yang dijamin lengkap untuk seluruh wilayah atau seluruh film.
- Konten review editorial internal.

## Keputusan produk: pencarian multi-entitas

Pencarian multi-entitas untuk pemeran dan sutradara telah dievaluasi. Endpoint TMDB `search/multi` dapat menemukan person, tetapi pengalaman yang berguna juga membutuhkan halaman detail person dan filmografi yang belum ada di scope saat ini. Pencarian judul film tetap menjadi mekanisme utama; pencarian person ditunda sampai alur detail person dapat diselesaikan end-to-end.

## Ketergantungan dan risiko

- Kelengkapan setiap bagian bergantung pada data TMDB.
- Endpoint, rate limit, dan ketersediaan provider TMDB dapat berubah.
- API key harus tersedia sebagai `VITE_TMDB_API_KEY` di lingkungan aplikasi.
- Routing detail tetap memakai hash sampai target hosting yang mendukung fallback SPA dikonfirmasi.
