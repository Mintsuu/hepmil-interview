import { chromium, Page } from "@playwright/test";
import { MemeFormat } from "@prisma/client";

export type SubredditPostData = {
  title: string | null;
  likes: number | null;
  author: string | null;
  comments: number | null;
  posted_on: string | null;
  format: MemeFormat | null;
  link: string | null;
  thumbnail: string | null;
};

export async function useSubRedditScraper(subreddit_url: string) {
  // Instantiate browser and user-agent to avoid bot detection
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0',",
  });
  const page = await context.newPage();

  // Navigating to subreddit and scrolling down to trigger infinite scroll
  await page.goto(subreddit_url);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForLoadState("networkidle");

  const listOfPosts = await retrieveSubredditPosts(page);
  await browser.close();
  return { listOfPosts };
}

// Function to retrieve subreddit posts based on retrieved page
async function retrieveSubredditPosts(page: Page) {
  const articles = await page.locator("article shreddit-post").all();
  const data: SubredditPostData[] = await Promise.all(
    articles.map(async (article) => {
      // Thumbnail URL not present in article metadata, so retrieving it from the first thumbnail
      const thumbnailList = await article
        .locator(".object-cover")
        .elementHandles();
      return {
        title: (await article.getAttribute("post-title")) ?? null,
        author: (await article.getAttribute("author")) ?? null,
        likes: Number(await article.getAttribute("score")) ?? null,
        comments: Number(await article.getAttribute("comment-count")) ?? null,
        posted_on: (await article.getAttribute("created-timestamp")) ?? null,
        format:
          ((await article.getAttribute("post-type")) as MemeFormat) ?? null,
        link: (await article.getAttribute("content-href")) ?? null,
        thumbnail: (await thumbnailList[0].getAttribute("src")) ?? null,
      };
    })
  );
  return data;
}
