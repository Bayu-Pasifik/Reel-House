# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Publik yang mencari informasi film sebelum memutuskan untuk menontonnya di bioskop, melalui streaming, sewa, atau beli digital.

## Product Purpose

ReelHouse membantu pengunjung menemukan film dan memahami konteks pentingnya—sinopsis, trailer, pemeran, rating, ketersediaan, dan film terkait—sebelum memilih tempat menonton.

## Positioning

ReelHouse menggabungkan discovery editorial yang tenang dengan data film TMDB yang diperbarui langsung, termasuk ketersediaan provider untuk Indonesia.

## Operating Context

Pengunjung biasanya datang dari pencarian judul, rasa ingin tahu pada film yang sedang ramai, atau kebutuhan memilih tontonan. Mereka membutuhkan informasi ringkas di beranda dan detail yang cukup luas pada halaman film.

## Capabilities and Constraints

- Aplikasi web React + Vite dengan TanStack Query, GSAP, dan TMDB API.
- Data berasal dari TMDB; produk tidak disponsori atau disertifikasi oleh TMDB.
- Provider tontonan diprioritaskan untuk wilayah Indonesia.
- Kunci TMDB disimpan melalui `VITE_TMDB_API_KEY` dan tidak boleh dikomit.

## Brand Commitments

Nama produk adalah ReelHouse. Suaranya editorial, terkurasi, dan fokus pada keputusan menonton—bukan agregator data yang padat.

## Evidence on Hand

- Implementasi aktif pada `src/App.tsx`, `src/tmdb.ts`, dan `src/styles.css`.
- Data live dari endpoint TMDB untuk discovery dan detail film.
- Tidak ada riset pengguna, metrik penggunaan, atau konten editorial manual di repositori saat ini.

## Product Principles

1. Prioritaskan informasi yang membantu keputusan menonton.
2. Tampilkan detail mendalam pada halaman sendiri, bukan dalam modal yang sempit.
3. Gunakan data live, tetapi tampilkan hanya bagian yang relevan dan tersedia.
4. Pertahankan pengalaman eksplorasi yang cepat dan tenang pada desktop maupun mobile.

