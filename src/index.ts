import "dotenv/config";
import "reflect-metadata";
import fs from "fs";
import path from "path";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

// import { dbConnection } from "./database";
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes";

export const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "8mb" }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(compression());

try {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, "../log/access.log"), {
    flags: "a",
  });
  app.use(morgan("combined", { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}
app.use(morgan("combined"));

app.use("/", routes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
