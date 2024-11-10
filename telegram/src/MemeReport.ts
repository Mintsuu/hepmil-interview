import fs from "fs";

export const downloadMemeReport = async () => {
  const data = await fetch("http://memes-api:3000/memes/report", {
    method: "GET",
  }).then((res) => res.text());

  if (!data) return;

  try {
    fs.writeFileSync("./reports/meme-report.csv", data);
  } catch (err: any) {
    console.error("Unable to download report", err);
  }
};
