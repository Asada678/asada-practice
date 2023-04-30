"use client";

import { FC } from "react";
import { useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { imagesType } from "./types";
import JSZip from "jszip";

interface CreateProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setImages: (images: imagesType[]) => void;
}

const SIZE_OPTIONS = [
  { ratio: "7:4", width: 896, height: 512 },
  { ratio: "3:2", width: 768, height: 512 },
  { ratio: "5:4", width: 640, height: 512 },
  { ratio: "1:1", width: 512, height: 512 },
  { ratio: "4:5", width: 512, height: 640 },
  { ratio: "2:3", width: 512, height: 768 },
  { ratio: "4:7", width: 512, height: 896 },
];

const MAX_IMAGE_COUNT = 4;

const Create: FC<CreateProps> = ({ loading, setLoading, setImages }) => {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const negativeRef = useRef<HTMLTextAreaElement>(null);
  const scaleRef = useRef<HTMLInputElement>(null);
  const stepsRef = useRef<HTMLInputElement>(null);
  const seedRef = useRef<HTMLInputElement>(null);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[3]);
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(3);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    const prompt = promptRef.current!.value;
    const negative = negativeRef.current!.value;
    const width = selectedSize.width;
    const height = selectedSize.height;
    const ratio = selectedSize.ratio;
    const scale = parseFloat(scaleRef.current!.value);
    const steps = parseInt(stepsRef.current!.value, 10);
    const seed = parseInt(seedRef.current!.value, 10);

    const seedList = [];
    for (let i = 0; i < count; i++) {
      if (!seed) {
        seedList.push(Math.floor(Math.random() * 1000000000));
      } else {
        seedList.push(seed);
      }
    }

    try {
      const body = {
        prompt,
        negative,
        count,
        width,
        height,
        scale,
        steps,
        seedList,
      };

      const response = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`画像が生成できませんでした：${errorData.detail}`);
        setLoading(false);
        return;
      }

      const zipBlob = await response.blob();

      const zipArrayBuffer = await zipBlob.arrayBuffer();
      const zip = await JSZip.loadAsync(zipArrayBuffer);

      const imageDataList: imagesType[] = [];
      for (const [index, fileName] of Object.entries(Object.keys(zip.files))) {
        const imageFile = zip.file(fileName);
        const imageData = await imageFile!.async("blob");
        const imageObjectURL = URL.createObjectURL(imageData);

        imageDataList.push({
          imageSrc: imageObjectURL,
          prompt,
          negative,
          ratio,
          width,
          height,
          seed: seedList[parseInt(index, 10)],
          steps,
        });
      }

      setImages(imageDataList);
    } catch (error) {
      alert(error);
    }

    setLoading(false);
  };

  const countChangeHandler = (value: number | number[]) => {
    const numValue = value as number;
    setCount(numValue);
  };
  const sizeChangeHandler = (value: number | number[]) => {
    const numValue = value as number;
    setSize(numValue);
    setSelectedSize(SIZE_OPTIONS[numValue]);
  };

  return (
    <>
      <div className="mb-4 border-b-2 border-blue-100 text-lg font-bold">Create</div>

      <form onSubmit={onSubmit}>
        <div className="rounded-lg bg-blue-100 p-4 shadow">
          {/* プロンプト */}
          <div className="mb-5">
            <div className="mb-2 text-sm font-bold">Prompt</div>
            <textarea
              className="w-full rounded-lg border bg-gray-50  p-2 focus:bg-white focus:outline-none"
              rows={3}
              ref={promptRef}
              id="prompt"
              required
            />
          </div>
          {/* ネガティブプロンプト */}
          <div className="mb-5">
            <div className="mb-2 text-sm font-bold">Negative Prompt</div>
            <textarea
              className="w-full rounded-lg border bg-gray-50  p-2 focus:bg-white focus:outline-none"
              rows={3}
              ref={negativeRef}
              id="negative"
            />
          </div>

          {/* 画生成数 */}
          <div className="mb-5">
            <div className="mb-2 text-sm font-bold">Negative Prompt</div>
            <div className="px-2">
              <Slider
                min={1}
                max={MAX_IMAGE_COUNT}
                value={count}
                onChange={countChangeHandler}
                trackStyle={{ backgroundColor: "blue", height: 4 }}
                handleStyle={{
                  borderColor: "blue",
                  borderWidth: 2,
                  backgroundColor: "blue",
                  width: 16,
                  height: 16,
                }}
                railStyle={{ backgroundColor: "skyblue", height: 4 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm">
              {Array.from({ length: MAX_IMAGE_COUNT }, (_, i) => i + 1).map((data, index) => (
                <div key={index}>{data}</div>
              ))}
            </div>
          </div>

          {/* 画像生成サイズ */}
          <div className="mb-5">
            <div className="flex justify-between">
              <div className="mb-2 text-sm font-bold">Size</div>
              <div className="text-sm">
                {selectedSize.width} x {selectedSize.height}
              </div>
            </div>
            <div className="px-2">
              <Slider
                min={0}
                max={SIZE_OPTIONS.length - 1}
                value={size}
                onChange={sizeChangeHandler}
                trackStyle={{ backgroundColor: "blue", height: 4 }}
                handleStyle={{
                  borderColor: "blue",
                  borderWidth: 2,
                  backgroundColor: "blue",
                  width: 16,
                  height: 16,
                }}
                railStyle={{ backgroundColor: "skyblue", height: 4 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm">
              {SIZE_OPTIONS.map((data, index) => (
                <div key={index}> {data.ratio}</div>
              ))}
            </div>
          </div>

          {/* 画像がプロンプトにどれだけ従うか */}
          <div className="mb-5">
            <div className="mb-2 text-sm font-bold">Guidance Scale</div>
            <input
              className="w-full rounded-lg border bg-gray-50 p-2 focus:bg-white focus:outline-none"
              type="number"
              step={0.5}
              ref={scaleRef}
              id="scale"
              defaultValue={7.5}
              required
            />
          </div>

          {/* ステップ数 */}
          <div className="mb-5">
            <div className="mb-2 text-sm font-bold">Number of Inference Steps</div>
            <input
              className="w-full rounded-lg border bg-gray-50 p-2 focus:bg-white focus:outline-none"
              type="number"
              ref={stepsRef}
              id="steps"
              defaultValue={5}
              required
            />
          </div>

          {/* シード値 */}
          <div className="mb-5">
            <div className="mb-2 text-sm font-bold">Seed</div>
            <input
              className="w-full rounded-lg border bg-gray-50 p-2 focus:bg-white focus:outline-none"
              type="number"
              ref={seedRef}
              id="seed"
            />
          </div>

          {/* エラーメッセージ */}
          {error && <div className="mb-5 text-center text-red-500">{error}</div>}

          {/* ボタン */}
          <div>
            {" "}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none"
              disabled={loading}
            >
              <div className="flex items-center justify-center space-x-3">
                {loading && (
                  <div className="h-4 w-4 animate-spin rounded-full border border-white border-t-transparent"></div>
                )}
                <div>Generate</div>
              </div>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;
