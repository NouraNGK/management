// import express module
const express = require("express");

// import body-parser module
const bodyParser = require("body-parser");

// import bcrypt module
const bcrypt = require("bcrypt");

// import multer module
const multer = require("multer");

// import path module
const path = require("path");

// import jwt module
const jwt = require('jsonwebtoken');

// import express-session module
const session = require('express-session');

// import mongoose module
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://127.0.0.1:27017/managementDB');

// Import ObjectID
const { ObjectId } = require("mongodb");

// Models importation
const User = require("./models/user");
const Product = require("./models/product");
const Invoice = require("./models/invoice");
const { async } = require("rxjs/internal/scheduler/async");

// creates express application
const app = express();

// application config: configuration standard du body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Security configuration avec les instructions ci-dessous ou bien on installe le package "cors"
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

const secretKey = "manag23";
app.use(
    session({
        secret: secretKey,
    })
);

// Shortcut Path
app.use('/myFiles', express.static(path.join('backend/images')));

// Media Types
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});

// ********** Users ********** 

// Business Logic: Signup (ou add user)
app.post("/api/users/signup", (req, res) => {
    console.log("Here into signup", req.body);
    bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
        console.log("Here crypted Pwd", cryptedPwd);
        req.body.pwd = cryptedPwd;
        let user = new User(req.body);
        user.save((err, doc) => {
            console.log("Here error", err);
            console.log("Success", doc);
            if (err) {
                if (err.errors.tel) {
                    res.json({ msg: "0" });
                }
            } else {
                res.json({ msg: "1" });
            }
        });
    });
});


// Business Logic: Login

// response : 0 => Phone Nbr Error
// response : 1 => Pwd Error
// response : 2 => Success
app.post("/api/users/login", (req, res) => {
    console.log("Here Into BL: Login", req.body);
    let user;
    // Check if phone nbr exists
    User.findOne({ tel: req.body.tel })
        .then((doc) => {
            console.log("Here doc", doc);
            user = doc;
            // Send tel error msg
            if (!doc) {
                res.json({ msg: "0" });
            } else {
                // Check PWD
                return bcrypt.compare(req.body.pwd, doc.pwd);
            }
        })
        .then((isEqual) => {
            console.log("Here isEqual", isEqual);
            // Send Pwd Error Msg
            if (!isEqual) {
                res.json({ msg: "1" });
            } else {
                let userToSend = {
                    userId: user._id,
                    tel: user.tel
                };
                const token = jwt.sign(userToSend, secretKey, {
                    expiresIn: '1h',
                });
                res.json({ user: token, msg: `2` });
            }
        });
});



// ********** Products ********** 

// Business Logic: Add Product
app.post("/api/products", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log("Here into BL: Add course", req.body);
    req.body.img = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
    let obj = new Product(req.body);
    obj.save();
    res.json({ msg: "1" });
});

// Business Logic: Get all products
app.get("/api/products", (req, res) => {
    Product.find().then((docs) => {
        res.json({ allProducts: docs });
    });
});

// Business Logic: Get "search" product by Name
app.post("/api/products/search", (req, res) => {
    Product.findOne({ productName: req.body.productName.toLowerCase() }).then((doc) => {
        doc ? res.json({ msg: "1", product: doc }) : res.json({ msg: "0" });
    })
});

// Business Logic: Delete One Product
app.delete("/api/products/:id", (req, res) => {
    console.log("Here is product ID to delete", req.params.id);
    Product.deleteOne({ _id: req.params.id }).then(
        (response) => {
            response.deletedCount == 1
                ? res.json({ msg: "1" })
                : res.json({ msg: "0" })
        });
});

//   Business Logic: Get Product By Id
app.get("/api/products/:id", (req, res) => {
    console.log("Here is product ID", req.params.id);
    Product.findOne({ _id: req.params.id }).then(
        (doc) => {
            res.json({ product: doc });
        });
});

//   Business Logic: Edit product by ID
app.put("/api/products/editProduct/:id", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log("here is the ID of the product to be modified", req.params.id);
    console.log("here is the product to be updated", req.body);
    let newProduct = req.body;
    newProduct.img = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
    Product.updateOne({ _id: req.params.id }, newProduct).then((result) => {
        console.log("Here result after update", result);
        result.nModified == 1
            ? res.json({ msg: "Edited With Success" })
            : res.json({ msg: "Echec" });
    });
});


// ********** Invoices ********** 

// Business Logic: Add Invoice
app.post("/api/invoices", (req, res) => {
    console.log("Here into BL: Add invoice", req.body);
    let obj = new Invoice(req.body);
    obj.save();
    res.json({ msg: "1" });
});

// Business Logic: Get all invoices
app.get("/api/invoices", (req, res) => {
    Invoice.find().then((docs) => {
        res.json({ invoices: docs });
    });
});

//   Business Logic: Get Invoice By Id
app.get("/api/invoices/:id", (req, res) => {
    console.log("Here is product ID", req.params.id);
    Invoice.findOne({ _id: req.params.id }).then(
        (doc) => {
            res.json({ invoice: doc });
        });
});

// Business Logic: Delete Invoice
app.delete("/api/invoices/:id", (req, res) => {
    console.log("Here is product ID to delete", req.params.id);
    Invoice.deleteOne({ _id: req.params.id }).then(
        (response) => {
            response.deletedCount == 1
                ? res.json({ msg: "1" })
                : res.json({ msg: "0" })
        });
});

// make app exportable to be imported to other files
module.exports = app;