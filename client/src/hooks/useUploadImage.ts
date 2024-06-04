import { useState } from "react";

export const useUploadImage = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imagePreview, setImagePreview] = useState<File | null>(null);

  const fetchImage = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    setImagePreview(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  return { image, fetchImage, imagePreview, setImage, setImagePreview };
};
