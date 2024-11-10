import "./App.css";
import MemesList from "./features/MemesList/components/MemesList";
import { Button, Container, Group, Stack, Title } from "@mantine/core";
import useReport from "./hooks/useReport";

function App() {
  const { downloadMemeReport } = useReport();
  return (
    <Container maw="100%">
      <Stack id="memes-list">
        <Title py="xs">Top 20 Memes on /r/memes</Title>
        <MemesList />
      </Stack>
      <Group justify="space-between" grow>
        <Button
          variant="light"
          color="green"
          my="md"
          onClick={downloadMemeReport}
        >
          Download Report
        </Button>
      </Group>
    </Container>
  );
}

export default App;
