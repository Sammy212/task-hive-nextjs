export const getFileTypeFromUrl = (url) => {
  if (url === null || url === undefined) return "unknown";

  const extension = url.split(".").pop();

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "image";
    case "mp4":
    case "avi":
    case "mov":
      return "video";
    default:
      return "unknown";
  }
};