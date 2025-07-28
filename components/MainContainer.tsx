"use client";
import React, {useState } from "react";
import { Button } from "./ui/button";
import { analyzeImage } from "@/action/gemini";
import DropzoneInput from "./DropzoneInputImage";

type resultAnalyze = {
  information: string;
  related_tag: string[];
  related_question: string[];
};
const MainContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<null | File>(null);
  const [result, setResult] = useState<resultAnalyze>({
    information: "",
    related_tag: [],
    related_question: [],
  });

  const identifyImage = async () => {
    setLoading(true);
    try {
      if (image) {
        const res = await analyzeImage(
          image,
          "analyze this image with detail information and give the related tag and also some related question"
        );

        if (res?.data) {
          setResult((prev) => ({
            ...prev,
            information: res.data?.information as string, // Sesuaikan dengan nama properti dari API
            related_tag: res.data?.related_tag as string[], // Sesuaikan dengan nama properti dari API
            related_question: res.data?.related_question as string[], // Sesuaikan dengan nama properti dari API
          }));
        }
      }
    } catch (error) {
      console.log((error as Error).message);

      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl px-4 py-6 mx-auto">
      <div className="p-6 rounded bg-white">
        <h1 className="text-4xl font-bold text-center py-4">
          Identify Your Image
        </h1>

        <DropzoneInput fileImg={image} setFileImg={setImage} />

        <Button
          className="bg-indigo-700 w-full my-6 text-white transition-all hover:bg-indigo-600 font-medium"
          disabled={!image || loading}
          onClick={identifyImage}
        >
          {loading ? "identifying..." : "identify"}
        </Button>

        {result.information && (
          <div className="space-y-6">
            <h1 className="text-center font-bold text-2xl">Result analyze</h1>
            <p className="first-letter:text-4xl first-letter:uppercase">
              {result.information}
            </p>
            <div className="flex gap-2 items-center flex-wrap">
              {result.related_tag.map((el: string, i: number) => {
                return (
                  <Button
                    key={el + i}
                    className="bg-indigo-600 text-indigo-200"
                  >
                    {el}
                  </Button>
                );
              })}
            </div>
            <div className="my-2 space-y-2">
              {result.related_question.map((el: string, i: number) => {
                return (
                  <div
                    key={el + i}
                    className="w-full bg-indigo-800 py-2 rounded-xl px-4 text-indigo-200"
                  >
                    {el}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContainer;
