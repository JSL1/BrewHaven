# BrewHaven

BrewHaven is a full-stack coffee ordering application built using the MERN stack. Users can browse menu items, place orders, manage a cart, and save their favorite items and orders.

## Authors

- Jeremy St Pierre
- Karina Karanadze
- Alexander Bouwhuis
- Mitchel Lymer
- Sean Villamonte
- Shamsi Gafarov

---

# Running the Backend

Open a terminal and run:

```bash
cd server
node server.js
```
The application expects a .env file containing:

```bash
ATLASDB=<MongoDB Atlas connection string>
JWT_SECRET=<JWT signing key>
```

---

# 1. Server

The server is configured in `server/server.js`.

## Project Dependencies

```javascript
const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
const app = express();
```

These are the external libraries required by the project.

## Database Configuration

```javascript
const db = require('./config/db');
```

Connects to the database configuration file. See **Section 5**.

## Middleware

```javascript
app.use(cors());
```

Enables Cross-Origin Resource Sharing (CORS).

```javascript
app.use(express.json());
```

Parses incoming JSON request bodies.

```javascript
app.use(express.urlencoded({ extended: true }));
```

Parses URL-encoded form data.

```javascript
app.use(logger('dev'));
```

Logs incoming requests to the console.

## Routes

```javascript
var indexRouter = require('./routes/index');
var orderRouter = require('./routes/orders');
var itemRouter = require('./routes/items');
var userRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/orders', orderRouter);
app.use('/items', itemRouter);
app.use('/users', userRouter);
```

Each router handles requests for its own section of the application.

## Error Handling

### 404 Handler

```javascript
app.use(function(err, req, res, next) {
    next(createError(404));
});
```

Forwards unknown routes to the error handler.

### Error Handler

```javascript
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message
    });
});
```

Returns JSON describing the error.

## Starting the Server

```javascript
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```

Starts the Express server on **localhost:3000**.

---

# 2. Routes

## Creating a Router

```javascript
var router = express.Router();
```

Creates an Express router.

## Importing a Controller

```javascript
let authController = require('../controllers/auth');
```

Imports the controller containing the route logic.

## Assigning Routes

```javascript
router.post("/signin", authController.signin);
```

Visiting:

```
POST localhost:3000/signin
```

calls the `signin()` function in the authentication controller.

Similarly,

```
GET localhost:3000/items/:id
```

calls `getById()` from the Items controller.

---

# 3. Controllers

## Items Controller

### Importing the Model

```javascript
let ItemsModel = require('../models/items');
```

Imports the Item model so it can communicate with the MongoDB collection.

---

## Create

Adds a new item to the database.

```javascript
// Code...
```

Creates a new document using the request body, saves it to MongoDB, and returns the newly created item.

---

## Read (One)

Gets one item using its ID.

```javascript
// Code...
```

Retrieves a single item from MongoDB using its `_id`.

---

## Update

Updates an existing item.

```javascript
// Code...
```

Replaces the existing document with the updated values from the request body.

---

## Delete

Deletes an item from the database.

```javascript
// Code...
```

Removes the matching document from MongoDB.

---

## Read (All)

Gets every item in the collection.

```javascript
// Code...
```

Returns every document in the Items collection.

---

## Orders Controller

### Read Order Details

Gets every item belonging to a specific order.

```javascript
// Code...
```

Finds every line item associated with an order, populates each item reference with its full item information, and returns a simplified list containing the item name, price, and subtotal.

---

# 4. Models

## Item Model

Represents an item available for purchase.

```javascript
let itemsModel = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    category: String
},
{
    collection: 'items'
});
```

---

## Order Model

Represents a customer's order.

```javascript
let ordersModel = mongoose.Schema({
    customerName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['Pending', 'Served', 'Cancelled'],
        default: 'Pending'
    }
});
```

---

## OrderItemLine Model

Acts as a bridge between Orders and Items.

```javascript
const orderItemLinesModel = new mongoose.Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    priceAtPurchase: {
        type: Number,
        required: true
    }
},
{
    collection: 'orderItemLines'
});
```

Stores which items belong to an order, along with the quantity purchased and the purchase price.

---

# 5. Database

## Loading Environment Variables

```javascript
require('dotenv').config();
```

Loads variables from the `.env` file.

## Importing MongoDB

```javascript
const { ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
```

Imports MongoDB and Mongoose.

## Database URI

```javascript
const uri = process.env.ATLASDB;
```

Reads the MongoDB Atlas connection string from the `.env` file.

## Connection Options

```javascript
const clientOptions = {
    ServerApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};
```

These options configure the MongoDB Server API.

- `version: '1'` keeps the API version consistent.
- `strict: true` throws an error if unsupported commands are used.
- `deprecationErrors: true` warns about deprecated features.