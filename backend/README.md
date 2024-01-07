# Belajar MERN - Backend

## Install Depedencies

Instal semua depedencies yang diperlukan

```bash
npm install
```

## Buat file _.env_

Buat file _.env_ di folder _backend_ dan buat variable **MONGODB_URL** yang value/nilainya diisi dengan _Connection String_ yang diberikan **[MongoDB](https://www.mongodb.com/)**.

## Menjalankan Server

Jalankan server sebelum menggunakan aplikasi

```bash
npm start
```

Tunggu hingga muncul tulisan _'Server Connected'_ dan _'MongoDB Connected'_.

## Depedencies

1. CORS (_Cross Origin Resource Sharing_)

   ```bash
   npm install cors
   ```

   - [Simple Usage (Enable all CORS request)](https://www.npmjs.com/package/cors#usage)

   ```javascript
   var express = require("express");
   var cors = require("cors");
   var app = express();

   app.use(cors());

   app.get("/products/:id", function (req, res, next) {
   	res.json({ msg: "This is CORS-enabled for all origins!" });
   });

   app.listen(80, function () {
   	console.log("CORS-enabled web server listening on port 80");
   });
   ```

2. [dotenv](https://www.npmjs.com/package/dotenv)

   Berfungsi untuk mengambil variable yang kita letakkan di file _.env_

   ```bash
   npm install dotenv
   ```

   - [Simple Usage](/backend/index.js)

   ```javascript
   //..
   import dotenv from "dotenv";
   dotenv.config();

   const dbUrl = process.env.MONGODB_URL;

   //...
   ```

3. [ExpressJS](https://www.niagahoster.co.id/blog/express-js-adalah/)

   Express.js adalah framework web app untuk Node.js yang ditulis dengan bahasa pemrograman JavaScript. Express.js adalah framework back end. Artinya, ia bertanggung jawab untuk mengatur fungsionalitas website, seperti pengelolaan routing dan session, permintaan HTTP, penanganan error, serta pertukaran data di server .

   ```bash
   npm install exporess
   ```

   - [Simple Usage](https://expressjs.com/en/starter/hello-world.html)

   ```javascript
   const express = require("express");
   const app = express();
   const port = 3000;

   app.get("/", (req, res) => {
   	res.send("Hello World!");
   });

   app.listen(port, () => {
   	console.log(`Example app listening on port ${port}`);
   });
   ```

4. [mongoose](https://mongoosejs.com/docs/guides.html)

   Mongoose adalah sebuah library yang berfungsi untuk membantu/mempermudah kita mengakses MongoDB.

   ```bash
   npm install mongoose
   ```

   - Simple Usage

     - [Membuat Koneksi](/backend/index.js)

     ```javascript
     //index.js
     //...
     import mongoose from "mongoose";
     import dotenv from "dotenv";
     dotenv.config();

     //...

     const dbUrl = process.env.MONGODB_URL;
     const options = {
     	useNewUrlParser: true,
     	useUnifiedTopology: true,
     };
     mongoose
     	.connect(dbUrl, options)
     	.then(() => console.log("MongoDB Connected"))
     	.catch((error) => console.log("MongoDB : " + error.message));

     //...
     ```

     - [Membuat Schema](/backend/models/UserModels.js)

     ```javascript
     //UserModels.js
     import mongoose from "mongoose";

     const UserSchema = new mongoose.Schema({
     	user: {
     		type: String,
     		require: true,
     	},
     	password: {
     		type: String,
     		require: true,
     	},
     });

     export default mongoose.model("users", UserSchema);
     ```

     - [Ambil data dari MongoDB](/backend/routes/UserRoute.js)

     ```javascript
     //UserRoute.js
     import express from "express";
     import UserSchema from "../models/UserModels.js";

     const router = express.Router();

     router.route("/").get(async (req, res, next) => {
     	try {
     		const data = await UserSchema.find();
     		res.json(data);
     	} catch (error) {
     		console.log(error.message);
     		res.status(500).json({ message: error.message });
     	}
     });

     //...
     ```
