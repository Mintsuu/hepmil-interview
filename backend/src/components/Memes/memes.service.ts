import prisma from "../../utils/prisma";
import { SubredditPostData } from "../../utils/scraper";

export async function saveMemesToDatabase(memeList: SubredditPostData[]) {
  for (const meme of memeList) {
    if (meme.author === null) continue;
    const author = await prisma.author
      .upsert({
        where: {
          username: meme.author,
        },
        create: {
          username: meme.author,
        },
        update: {
          username: meme.author,
        },
      })
      .catch((err: any) =>
        console.error(`Unable to parse author: ${meme.author}`, err)
      );

    if (author)
      await prisma.memes
        .upsert({
          where: {
            posted_by_title: {
              posted_by: author.id,
              title: meme.title ?? "No title found",
            },
          },
          create: {
            title: meme.title ?? "No title found.",
            posted_on: meme.posted_on ? new Date(meme.posted_on) : null,
            format: meme.format ?? "unknown",
            total_likes: meme.likes ?? 0,
            total_comments: meme.comments ?? 0,
            live_link: meme.link ?? "No live link found.",
            thumbnail_link: meme.thumbnail ?? "No thumbnail found.",
            posted_by: author?.id ?? "No author found.",
          },
          update: {
            title: meme.title ?? "No title found.",
            posted_on: meme.posted_on ? new Date(meme.posted_on) : null,
            format: meme.format ?? "unknown",
            total_likes: meme.likes ?? 0,
            total_comments: meme.comments ?? 0,
            live_link: meme.link ?? "No live link found.",
            thumbnail_link: meme.thumbnail ?? "No thumbnail found.",
            posted_by: author?.id ?? "No author found.",
          },
        })
        .catch((err: any) =>
          console.error(`Unable to parse post: ${memeList[0].title}`, err)
        );
  }
}

export async function getMemesFromDatabase() {
  let result = [];
  let memesList = await prisma.memes.findMany({
    where: {
      posted_on: {
        gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        lte: new Date(),
      },
    },
    orderBy: {
      total_likes: "desc",
    },
    take: 20,
  });

  for (const meme of memesList) {
    const author = await prisma.author.findUnique({
      where: {
        id: meme.posted_by,
      },
    });
    result.push({
      ...meme,
      author_name: author?.username,
    });
  }

  return result;
}
