import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: Buffer,
  filename: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "terodz/products",
        public_id: filename.replace(/\.[^/.]+$/, ""),
        overwrite: true,
        resource_type: "image",
        transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }],
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload failed"));
        resolve(result.secure_url);
      }
    );
    stream.end(file);
  });
}

export async function deleteImage(publicIdOrUrl: string): Promise<void> {
  let publicId = publicIdOrUrl;
  // Extract public_id from full URL if needed
  if (publicIdOrUrl.includes("cloudinary.com")) {
    const parts = publicIdOrUrl.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex !== -1) {
      publicId = parts
        .slice(uploadIndex + 2)
        .join("/")
        .replace(/\.[^/.]+$/, "");
    }
  }
  await cloudinary.uploader.destroy(publicId);
}
