import { drizzle } from 'drizzle-orm/mysql2';

export const db = drizzle('mysql://root@localhost:3306/motion-hai')