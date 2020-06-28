# Blog_API

Daily Blog website that allows the user to signup, login, fetch weather, show login status, create/update/publish/delete posts, upload images for the post, comment on the post with likes/dislikes.

Tools used:
* Server-side: Express.js/Node.js
* Client-side: React, Styled Components for modularized CSS, Bootstrap
* Others: multer (for file uploads), PassportJS: LocalStrategy (login authentication) & JWTStrategy (delete user access), bcrypt (password encryption)

Steps to Run:

1. git clone/download the source files.
2. npm install to install dependencies (@ both server & client directories).
3. Start server: node ./bin/www (@ /Blog_API)
4. Start client: npm start (@ /Blog_API/client)

To have full access to all functionalities, login as:
* Username: admin
* Password: adminPass
