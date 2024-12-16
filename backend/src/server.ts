import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRouter from "./routes/movie.routes";
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://movie-picker-flax.vercel.app/",
    // credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/movies", movieRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("Access denied");
});

const PORT: number = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
