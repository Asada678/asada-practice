import { FC } from "react";
import { imagesType } from "./types";
import Image from "next/image";

interface GenerateProps {
  images: imagesType[] | null;
  loading: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  setModalData: (image: imagesType) => void;
}

const Generate: FC<GenerateProps> = ({ images, loading, setModalData, setModalOpen }) => {
  const openModal = (data: imagesType) => {
    setModalData(data);
    setModalOpen(true);
  };
  return (
    <>
      <div className="mb-4 border-b-2 border-blue-100 text-lg font-bold">Generation</div>
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-700 border-t-transparent"></div>
        </div>
      ) : images ? (
        <div className="grid grid-cols-2 gap-1">
          {images.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => openModal(image)}
            >
              <Image
                className="rounded-lg object-cover"
                src={image.imageSrc}
                alt="image"
                width={740}
                height={740}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>no images</div>
      )}
    </>
  );
};

export default Generate;
