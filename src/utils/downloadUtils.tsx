export const downloadFile = (filePath: string, fileName: string) => {
  try {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`Download started: ${fileName}`);
  } catch (error) {
    console.error("Download failed:", error);
    window.open(filePath, "_blank");
  }
};

export const getFileNameFromPath = (filePath: string): string => {
  return filePath.split("/").pop() || "download";
};
