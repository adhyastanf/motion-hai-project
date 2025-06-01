import { defineConfig } from 'drizzle-kit';

// export default defineConfig({
//   dialect: 'mysql', // Menyebutkan MySQL sebagai database yang digunakan
//   schema: 'src/lib/db/schema.ts', // Lokasi file skema tabel Anda
//   out: 'src/lib/db/migrations-folder',
//   dbCredentials: {
//     host: 'localhost',
//     user: 'haimotio_hai-motion',
//     password: 'SW@_$c)w_Wp(',
//     database: 'haimotio_hai-motion',
//     port: '3306',
//   },
// });

// import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'mysql', // Menyebutkan MySQL sebagai database yang digunakan
  schema: 'src/lib/db/schema.ts', // Lokasi file skema tabel Anda
  out: 'src/lib/db/migrations-folder',
  dbCredentials: {
    host: 'localhost',
    user: 'root',
    database: 'motion-hai',
  },
});
