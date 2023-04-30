"user client";
import { FC } from "react";
import { useState } from "react";
import { imagesType } from "./types";
import Create from "./Create";
import Generate from "./Generate";
import Modal from "./Modal";

interface mainProps {}

const testImages: imagesType[] = [
  {
    imageSrc: "https://placehold.jp/512x512.png",
    prompt: "test prompt",
    negative: "test negative prompt",
    width: 512,
    height: 512,
    ratio: "1:1",
    steps: 30,
    seed: 1,
  },
  {
    imageSrc: "https://placehold.jp/512x512.png",
    prompt: "test prompt2",
    negative: "test negative prompt2",
    width: 512,
    height: 512,
    ratio: "1:1",
    steps: 30,
    seed: 2,
  },
];

const Main: FC<mainProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<imagesType[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<imagesType | null>(null);

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="grid grid-cols-5 gap-4">
      {/* モーダル */}
      {modalData && (
        <Modal
          isOpen={modalOpen}
          closeModal={closeModal}
          modalData={modalData}
        />
      )}
      <div className="col-span-2">
        {/* 画像生成フォーム */}
        <Create
          loading={loading}
          setLoading={setLoading}
          setImages={setImages}
        />
      </div>
      <div className="col-span-3">
        {/* 生成画像 */}
        <Generate
          images={images}
          loading={loading}
          setModalData={setModalData}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
};

export default Main;
