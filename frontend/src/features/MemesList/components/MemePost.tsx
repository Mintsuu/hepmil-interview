import { Paper, Stack, Title, Badge, Text, Image, Group } from "@mantine/core";
import { formatRelativeDate } from "../../../utils/DateHelpers";

export type MemePostProps = {
  post_number: number;
  image_url: string;
  post_url: string;
  format: string;
  title: string;
  author_name: string;
  posted_on: Date;
  likes: number;
  comments: number;
};

function MemePost({ ...props }: MemePostProps) {
  return (
    <Paper p="md" shadow="md">
      <Stack justify="center" align="center">
        <Text fw={700} size="lg">
          #{props.post_number}
        </Text>
        <Badge variant="light" color="red">
          {props.format}
        </Badge>
        <a href={props.post_url} target="_blank">
          <Image
            src={`${props.image_url}?test=test`}
            radius="xl"
            maw="150px"
            mah="150px"
          />
        </a>
        <Stack gap="xs" justify="center" align="center">
          <Stack gap="xs" align="center" justify="center">
            <Title order={2} size="md" ta="center" maw={200}>
              {props.title}
            </Title>
            <Stack gap={0}>
              <Text ta="center" size="xs">
                By: {props.author_name}
              </Text>
              <Text ta="center" size="xs">
                Posted: {formatRelativeDate(props.posted_on)}
              </Text>
            </Stack>
          </Stack>
          <Group gap={0} my="xs" justify="center">
            <Badge variant="light" color="green">
              Likes: {props.likes.toLocaleString()}
            </Badge>
            <Badge variant="light" color="indigo">
              Comments: {props.comments.toLocaleString()}
            </Badge>
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default MemePost;
