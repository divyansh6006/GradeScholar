const fs = require('fs');
const path = require('path');
const { createClient } = require('@libsql/client');

async function migrate() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }

  // Handle libsql:// URL with authToken query param
  let parsedUrl = url;
  let authToken = undefined;
  
  if (url.includes('?authToken=')) {
    const parts = url.split('?authToken=');
    parsedUrl = parts[0];
    authToken = parts[1];
  }

  const client = createClient({
    url: parsedUrl,
    authToken: authToken
  });

  const migrationsDir = path.join(__dirname, 'prisma', 'migrations');
  const dirs = fs.readdirSync(migrationsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort();

  for (const dir of dirs) {
    const migrationFile = path.join(migrationsDir, dir, 'migration.sql');
    if (fs.existsSync(migrationFile)) {
      console.log(`Applying migration ${dir}...`);
      const sql = fs.readFileSync(migrationFile, 'utf8');
      const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
      
      for (const statement of statements) {
        try {
          await client.execute(statement);
        } catch (err) {
          console.error(`Error executing statement: ${statement}`);
          console.error(err);
          throw err;
        }
      }
      console.log(`Successfully applied ${dir}`);
    }
  }

  console.log('Migrations complete!');
}

migrate().catch(console.error);
