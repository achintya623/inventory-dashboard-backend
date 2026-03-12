const express = require("express");
const app = express();
const categoriesRouter = require("./routes/categoriesRouter");
const itemsRouter = require("./routes/itemsRouter");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/categories", categoriesRouter);
app.use("/", itemsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening to app on port ${PORT}`);
});
