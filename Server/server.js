const express = require('express')
const app = express()
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3001

app.use(express.json());
/*app.use(
  cors({
    origin: ["192.168.0.110:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);*/
app.use(cors());

//app.use(express.static("../client/build"));

mongoose
  .connect(
    "mongodb+srv://danikaszman:danikaszman@cluster.soqfcau.mongodb.net/Products?retryWrites=true&w=majority&appName=Cluster"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


const ProductSchema = new mongoose.Schema({
    NameOfProduct: {
      type: String,
      required: true,
    },
    ExpiryDate: {
      type: Date,
      required: true,
    },
    Barcode: {
      type: Number,
      required: true,
    },
  });
  
const ProductModel = mongoose.model("Products", ProductSchema);

app.get("/", async (req, res) => {
    let foundProducts = await ProductModel.find({});
  
    if (!foundProducts) {
      res.send("No data!");
      return;
    }
  
    res.send(foundProducts);
});

app.listen(port, () => {
  console.log("Server is running...")
})

