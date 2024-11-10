import { APIWrapper } from "../../../utils/APIWrapper";

export async function retrieveAndSaveMemes() {
  const api = new APIWrapper({ baseUrl: "http://localhost:3000" });
  const memesList = await api.get({
    url: "/memes/",
    method: "GET",
  });
  return memesList;
}

export async function getTop20MemesList() {
  const api = new APIWrapper({ baseUrl: "http://localhost:3000" });
  const memesList = await api.get({
    url: "/memes/top-20-memes",
    method: "GET",
  });
  return memesList;
}

export async function getMemeReport() {
  const api = new APIWrapper({ baseUrl: "http://localhost:3000" });
  const report = await api.getFile({ url: "/memes/report", method: "GET" });
  return report;
}
