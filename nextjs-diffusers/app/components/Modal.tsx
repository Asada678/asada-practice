import { FC } from "react";
import { imagesType } from "./types";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  modalData: imagesType;
  closeModal: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, closeModal, modalData }) => {
  if (!isOpen) return null;

  const backgroundClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };
  const modalClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
      onClick={backgroundClickHandler}
    >
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity">
        <div
          className={`transform overflow-hidden rounded-lg bg-white shadow-xl transition-all ${
            modalData.width > 512 ? "max-w-screen-xl" : "max-w-screen-md"
          }`}
          onClick={modalClickHandler}
        >
          <div className="relative grid grid-cols-3 gap-4 p-4">
            <div
              className="absolute right-1 top-1 cursor-pointer"
              onClick={closeModal}
            >
              <XMarkIcon className="h-8 w-8 text-blue-500" />
            </div>
            <div className="col-span-2 flex justify-center">
              <Image
                className="max-h-screen rounded-lg object-contain"
                src={modalData.imageSrc}
                alt="image"
                width={modalData.width}
                height={modalData.height}
              />
            </div>
            <div className="col-span-1">
              <div className="mb-5">
                <div className="mb-1 text-sm font-bold">Prompt</div>
                <div>{modalData.prompt}</div>
              </div>
              <div className="mb-5">
                <div className="mb-1 text-sm font-bold">Negative Prompt</div>
                <div>{modalData.negative}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="mb-1 text-sm font-bold">Ratio</div>
                  <div>{modalData.ratio}</div>
                </div>
                <div>
                  <div className="mb-1 text-sm font-bold">Size</div>
                  <div>
                    {modalData.width} x {modalData.height}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-sm font-bold">Seed</div>
                  <div>{modalData.seed}</div>
                </div>
                <div>
                  <div className="mb-1 text-sm font-bold">Steps</div>
                  <div>{modalData.steps}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
