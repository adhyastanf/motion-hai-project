import { drizzle } from 'drizzle-orm/mysql2';

export const db = drizzle('mysql://root@localhost:3306/motion-hai')

// export const db = drizzle('mysql://haimotio_hai-motion:SW%40_%24c%29w_Wp%28@localhost:3306/haimotio_hai-motion');