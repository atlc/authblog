### But wait, there's more!

Blogs lab again, this time with auth!

There's a SQL file in `src/server/utils` that shows the structure of my db setup and can be run to prepopulate the tables with some info

Permissions-wise:

- Unauthenticated users may access just a preview of the first 150 characters of the blog. 
- Authenticated "users" may view the full blogs or create one of their own.
- Authenticated "admins" may edit the content or tags of a blog, or delete a blog.
- Authenticated "superadmins" may view all blogs authored by an individual user (currently API-only, no view has been created yet). They may also see all information from the Users table with the password sanitized out server-side (currently API-only, no view has been created yet).
- Roles are assigned in an array of permissions of `['user', 'admin', 'superadmin']`
  - When testing, you will need to register your 3 users first, then alter 2 in the DB to have those additional permissions since all default to just "user"



Eventual to-dos: 

- Create panels for the superadmin-only views
- Allow users to edit/delete their own blogs
- Allow users to add their own custom tags
- Create user profile page? with avatar links
- Create global notifier (either with global Toastify or SWAL2) and integrate that everywhere instead of using alerts in places