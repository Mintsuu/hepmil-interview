import { useQuery } from "@tanstack/react-query";
import { getTop20MemesList } from "../api/MemePost.api";

export type MemeResponse = {
  id: string;
  format: string;
  live_link: string;
  posted_by: string;
  posted_on: Date;
  thumbnail_link: string;
  title: string;
  total_comments: number;
  total_likes: number;
  author_name: string;
};

export function useMemes() {
  const { data, status } = useQuery({
    queryKey: ["top-20-memes-list"],
    queryFn: () => getTop20MemesList(),
  });

  return { data, status };
}
