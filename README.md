# Daily Post (Blog API)

Daily Post website allows the user to signup, login, fetch weather, show login status, create/update/publish/delete posts (CRUD), designate/view posts by category, upload images for the post, comment on the post with likes/dislikes.

Tools used:
* <b>Server-side</b>: Express.js/Node.js
* <b>Client-side</b>: React, Styled Components for modularized CSS, Bootstrap
* <b>Others</b>: multer (for file uploads), PassportJS: LocalStrategy (login authentication) & JWTStrategy (delete user access), bcrypt (password encryption)

Steps to Run:

1. git clone/download the source files.
2. npm install to install dependencies (@ both server & client directories).
3. Start server: node ./bin/www (@ /Blog_API)
4. Start client: npm start (@ /Blog_API/client)

To have full access to all functionalities, login as:
* Username: admin
* Password: adminPass

# Demo
