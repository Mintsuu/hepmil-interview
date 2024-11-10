import express, { Request, Response } from "express";
import { useSubRedditScraper } from "../../utils/scraper";
import {
  generateMemeReport,
  getTop20Memes,
  retrieveAndSaveMemes,
} from "./memes.controller";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const memesList = await retrieveAndSaveMemes();
    res.status(200).send({ memes: memesList });
  } catch (error: any) {
    res
      .status(500)
      .send({ error: error.message, message: "Something went wrong!" });
  }
});

router.get("/top-20-memes", async (req: Request, res: Response) => {
  try {
    const top20MemesList = await getTop20Memes();
    res.status(200).send(top20MemesList);
  } catch (error: any) {
    res
      .status(500)
      .send({ error: error.message, message: "Something went wrong!" });
  }
});

router.get("/report", async (req: Request, res: Response) => {
  try {
    const memeReport = await generateMemeReport();
    res.status(200).download(memeReport);
  } catch (error: any) {
    res
      .status(500)
      .send({ error: error.message, message: "Something went wrong!" });
  }
});

export default router;
