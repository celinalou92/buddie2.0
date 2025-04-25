import dotenv from 'dotenv';
dotenv.config()
import { seedDatabase } from '../seeders/seeds.js';


async function runDatabaseMaintenance() {
  try {
    console.log('Starting database maintenance...');
    console.log('Executing database seeding...');
    await seedDatabase();

    console.log('Database maintenance completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error during database maintenance:', error);
    process.exit(1);
  }
}

runDatabaseMaintenance();

