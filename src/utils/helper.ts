import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
const downloadImage = async (imageUrl, filename) => {
  const { uri } = await FileSystem.downloadAsync(
    imageUrl,
    FileSystem.documentDirectory + `${filename}.jpeg` // Specify filename and path
  );
  console.log("Downloaded image URI:", uri);
  return uri; // Or return the full path for further processing
};

const saveToPhotos = async (imageUri) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to save photos.");
    return;
  }

  await MediaLibrary.saveToLibraryAsync(imageUri);
  console.log("Saved image to Photos library:");
};

export const fetchAndSaveImage = async (imageUrl, filename) => {
  try {
    const downloadedImageUri = await downloadImage(imageUrl, filename);
    console.log("Downloaded image:", downloadedImageUri);

    // Optional: Save to Photos library
    await saveToPhotos(downloadedImageUri);
  } catch (error) {
    console.error("Error fetching or saving image:", error);
  }
};
