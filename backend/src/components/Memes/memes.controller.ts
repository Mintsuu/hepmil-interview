import { useSubRedditScraper } from "../../utils/scraper";
import { getMemesFromDatabase, saveMemesToDatabase } from "./memes.service";
import { json2csv } from "json-2-csv";
import fs from "fs";

export async function retrieveAndSaveMemes() {
  const { listOfPosts } = await useSubRedditScraper(
    "https://www.reddit.com/r/memes/top/?feedViewType=compactView"
  );

  await saveMemesToDatabase(listOfPosts);
  return listOfPosts;
}

export async function getTop20Memes() {
  const memesList = await getMemesFromDatabase();
  return memesList;
}

export async function generateMemeReport() {
  const memesList = await getMemesFromDatabase();
  const csv = await json2csv(memesList);
  const path = "./reports/memes.csv";

  await fs.writeFileSync("./reports/memes.csv", csv);
  return path;
}
