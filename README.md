## Antikode BE Exam

### Tech Stack :
1. Postgresql 11
2. NestJS (> Node 14)
3. OpenAPI (Swagger)
4. Typeorm
5. Multer

### How To :
1. Clone this repo `git@github.com:danudenny/antikode_exam.git`
2. Install Package using `npm install` or `yarn install`
3. Copy `.env.example` to `.env`. Fill with your database credentials.
4. Migrate database using `yarn typeorm migration:run`
5. Run `yarn start:dev`
6. Go to `localhost:3000/docs` to access rest api using swagger.

### Tasks :
1. Create CRUD API and build based on the description below:
   - [x] Brand, consists of (name, logo, banner)
   - [x] Outlet, consists of (name, picture, address, longitude, latitude)
   - [x] Product, consists of (name, picture, price)
2. Based on previous data, display data below with SQL query (you can save the query to SQL file in repo):
   - [ ] Brand name
   - [ ] Outlet name, address, longitude, latitude
   - [ ] Total product
   - [ ] Distance Outlet position from Monas Jakarta in Kilometers
---
### Notes :
1. Each brand will have multiple outlets and multiple products
2. Sort by distance closest to Monas
3. API in Graphql is a plus 

---

1. Here are some general instructions for the task above.
2. [x] Read the description carefully.
3. [x] Use Mysql or Postgresql for the database, and upload it to GitHub when you get back to us.
4. [ ] Please send and attach your work to fahrurrazi@antikode.com deddy@antikode.com fajar@antikode.com and cc to rebecca@antikode.com
5. [ ] Use this as an email subject: Backend Developer Test_Name (ex: Backend Developer Test_Ahmad Yani).
6. [ ] Remember to use best practices for any kind of methodology you use.

---

### Database Migrations :
1. Generate Migration 
```shell
yarn typeorm migration:generate -p -n 'YourMigrationName'
```
2. Run generated migration
```shell
yarn typeorm migration:run
```