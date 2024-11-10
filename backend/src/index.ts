import dotenv from "dotenv";
import express, { Application } from "express";
import GeneralRoutes from "./components/General/general.route";
import MemesRoutes from "./components/Memes/memes.route";
import cors from "cors";

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
app.use("/general", GeneralRoutes);
app.use("/memes", MemesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
