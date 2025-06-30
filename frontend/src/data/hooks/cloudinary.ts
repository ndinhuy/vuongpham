import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

import { CLOUDINARY_UPLOAD_BASE_URL, CLOUDINARY_UPLOAD_PRESET } from "@app/constants";

const cloudinaryAxiosInstance = axios.create({
  baseURL: CLOUDINARY_UPLOAD_BASE_URL,
});

export const uploadFiles = async (files: File[]): Promise<string[]> => {
  try {
    const formData = new FormData();
    const urls = [];

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const data = await cloudinaryAxiosInstance.post("/upload", formData);

      urls.push(data.data.secure_url);
    }

    return urls;
  } catch (error) {
    console.error((error as Error).message);
    return [];
  }
};

export const useUploadFile = (): UseMutationResult<string[], Error, File[], unknown> => {
  return useMutation({
    mutationFn: (files: File[]) => uploadFiles(files),
  });
};
