import cloudinary from "../../config/cloudinary.ts";

export const uploadToCloudinary = (buffer: Buffer) => {
    
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result!.secure_url);
      }
    ).end(buffer);
  });
};