import { ImageModel } from "../apimodels/homepage";

export function extractImageUrl(data: ImageModel | undefined) {
  if (!data) {
    return "";
  }

  if (typeof data === "string") return data;

  return (
    data?.formats?.medium?.url ||
    data?.url ||
    data?.formats?.thumbnail?.url ||
    "/placeholder.png"
  );
}
