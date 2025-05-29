import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'mysql', // Menyebutkan MySQL sebagai database yang digunakan
  schema: 'src/lib/db/schema.ts', // Lokasi file skema tabel Anda
  out: 'src/lib/db/migrations-folder',
  dbCredentials: {
    host: 'brianza.id.rapidplex.com',
    user: 'haimotio_hai-motion',
    password: 'SW@_$c)w_Wp(',
    database: 'haimotio_hai-motion',
  },
});
