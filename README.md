# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.

## Moses Marvian Arsata / 535250050

## Additional endpoints:
1. Melakukan gacha pada user yang sudah ada di schema user (dengan peluang 50%): PUT localhost:5000/api/gacha/:id
CATATAN: Untuk input id menggunakan _id dari schema user.
2. Mengambil informasi gacha pada user yang ada di schema dan beserta histori gachanya: GET localhost:5000/api/gacha/:id
CATATAN: Untuk input id menggunakan _id dari schema user.
3. Mengambil informasi mengenai prize yang ada, kuota, dan jumlah yang masih tersedia: GET localhost:5000/api/prizes
4. Mengambil informasi mengenai pemenang masing-masing hadiah (dan ada filter username): GET localhost:5000/api/winners

CATATAN: parameter hanya digunakan di link pada gacha untuk input id user, dan tidak menggunakan parameter di body raw pada Echo API.

## Apa yang diubah di components?
1. Penambahan schema & components baru:
  a. Prizes: Berisi hadiah yang diselenggarakan yang disimpan di database prizes, dengan inisialisasi masing-masing item langsung saat menjalankan npm run dev (jika list pada barang kosong).
  b. Gacha: Berisi sistem gacha pada suatu user, yang dimana user id dan nama usernya diambil dari schema Users.
  c. Winners: Berisi pemenang pada masing-masing hadiah yang ada pada schema prizes, beserta nama pemenangnya difilter.
2. Update di schema & components Users: Menambahkan fungsi di createUser untuk langsung membuat database baru pada schema gacha, sehingga saat user dicreate dapat langsung digunakan untuk gacha.