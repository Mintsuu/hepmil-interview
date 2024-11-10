import { SimpleGrid, Skeleton } from "@mantine/core";
import MemePost from "./MemePost";
import { MemeResponse, useMemes } from "../hooks/useMemes";

function MemesList() {
  const { data, status } = useMemes();
  return (
    <SimpleGrid cols={4} w="100%">
      {status === "pending"
        ? [...new Array(20)].map((_, index) => (
            <Skeleton height={400} my={6} key={index} />
          ))
        : data.map((memePost: MemeResponse, index: number) => (
            <MemePost
              key={index}
              post_number={index + 1}
              author_name={memePost.author_name}
              title={memePost.title}
              comments={memePost.total_comments}
              image_url={memePost.thumbnail_link}
              post_url={memePost.live_link}
              format={memePost.format}
              likes={memePost.total_likes}
              posted_on={new Date(memePost.posted_on)}
            />
          ))}
    </SimpleGrid>
  );
}

export default MemesList;
