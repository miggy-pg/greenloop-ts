import { useState } from "react";

interface ImagePreview {
  [id: string]: { name: number };
}

export const useUploadImage = () => {
  const [image, setImage] = useState<string | string[] | null | ArrayBuffer>(
    null
  );
  const [imagePreview, setImagePreview] = useState<
    File | null | string | ImagePreview | undefined
  >(null);

  const fetchImage = (e: React.FormEvent<HTMLInputElement>) => {
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
