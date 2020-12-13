### But wait, there's more!

Blogs lab again, this time with auth.

There's a SQL file in `src/server/utils` that shows the structure of my db setup and can be run independently in your DB frontend of choice, or there's also a helper module you can run with `npx ts-node src/server/utils/execute_sql.ts` to take care of building + populating the DB automatically. You may need to initially create the schema itself; after that you can run the script.