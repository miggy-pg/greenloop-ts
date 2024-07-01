import { useState } from "react";

function useUploadImage() {
  const [image, setImage] = useState<
    string | string[] | undefined | ArrayBuffer
  >(undefined);
  const [imagePreview, setImagePreview] = useState<File | null>(null);

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
}

export default useUploadImage;
