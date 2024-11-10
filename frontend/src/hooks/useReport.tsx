import { useQuery } from "@tanstack/react-query";
import { getMemeReport } from "../features/MemesList/api/MemePost.api";

export default function useReport() {
  const { data, refetch } = useQuery({
    queryKey: ["memes-report"],
    queryFn: () => getMemeReport(),
  });
  const downloadMemeReport = async () => {
    // https://javascript.plainenglish.io/download-pdf-from-api-in-reactjs-using-axios-and-blobs-699be8a27ca7
    if (!data) return;
    try {
      const csvBlob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(csvBlob);

      const tempAnchor = document.createElement("a");
      tempAnchor.href = url;
      tempAnchor.setAttribute("download", "memes-report.csv");

      document.body.appendChild(tempAnchor);
      tempAnchor.click();

      document.body.removeChild(tempAnchor);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("Unable to download report", err);
    }
  };
  return { refetch, downloadMemeReport };
}
