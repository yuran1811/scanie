import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { deleteImgSource, updateImgSource } from "@/redux/imgSourcesSlice";
import { preprocessImage, recognize } from "@/utils";
import { ErrorMessage } from "@cpns/interfaces";
import { Button, ProgressBar } from "@cpns/shared";
import { ImgSourcesProps, RecogResultType } from "@shared/types";
import { RecogResult } from "./RecogResult";

interface RecogItemProps {
  data: ImgSourcesProps;
  isRecog?: boolean;
}

export const RecogItem: FC<RecogItemProps> = ({ data: recogData, isRecog }) => {
  const [recogResult, setRecogResult] = useState<{ result: RecogResultType }>({
    result: recogData.recogResult || [],
  });
  const [isConvert, setConvert] = useState(true);
  const [progress, setProgress] = useState({
    value: 0,
    status: "",
    error: {
      isError: false,
      errorMessage: "",
    },
  });

  const dispatch = useDispatch();

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleClick = async () => {
    try {
      if (!canvasRef.current) return;

      setRecogResult({ result: [] });
      setConvert(false);

      const dataURI = canvasRef.current.toDataURL("image/jpeg");

      const data = await recognize(dataURI, (m: any) => {
        setProgress((s) => ({ ...s, value: m.progress, status: m.status }));
      });
      if (!data) return;
      console.log("recognized data: ", data.text);

      setRecogResult({
        result: data.blocks?.map((line) => ({ text: line.text })) || [],
      });
    } catch (error) {
      console.log(error + "");

      setProgress({
        value: 0,
        status: "",
        error: { isError: true, errorMessage: error + "" },
      });
    } finally {
      setConvert(true);
    }
  };

  useEffect(() => {
    if (typeof isRecog === "undefined") return;
    if (isRecog) handleClick();
  }, [isRecog]);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !imageRef || !imageRef.current) return;

    canvasRef.current.width = 500;
    canvasRef.current.height = 375;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = new Image(canvasRef.current.width, canvasRef.current.height);
    img.src = recogData.url;
    img.onerror = () => {
      !recogData.recogResult.length && dispatch(deleteImgSource(recogData.id));

      imageRef.current?.style &&
        Object.assign(imageRef.current.style, {
          display: "none",
        });
    };
    img.onload = () => {
      if (!canvasRef || !canvasRef.current) return;

      canvasRef.current.width = img.naturalWidth;
      canvasRef.current.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);
      const preprocessedImage = preprocessImage(canvasRef.current);
      if (!preprocessedImage) return;

      ctx.putImageData(preprocessedImage, 0, 0);
    };
  }, [recogData.url]);

  useEffect(() => {
    if (!recogResult) return;
    dispatch(updateImgSource({ id: recogData.id, data: { recogResult: recogResult.result } }));
  }, [recogResult]);

  return (
    <div className="group flexcentercol relative container mx-auto max-w-120 justify-start rounded-xl border-2 border-sky-200 border-t-transparent p-4 transition-all hover:bg-sky-800">
      {isConvert && !recogData.recogResult.length && (
        <Button className="font-semibold" onClick={handleClick}>
          Recognize
        </Button>
      )}

      {!!progress.status && !progress.error.isError && !recogResult.result.length && (
        <ProgressBar value={progress.value} status={progress.status} />
      )}

      {progress.error.isError && <ErrorMessage content={progress.error.errorMessage} />}

      {!!recogResult.result.length && (
        <RecogResult recogId={recogData.id} recogResult={recogResult.result} />
      )}

      {!!recogData.url && (
        <div className="flexcentercol z-20 mt-2 h-0 max-w-[40rem] transition-all **:w-full group-hover:h-auto">
          <img className="h-full" src={recogData.url} />

          <div className="hidden">
            <img ref={imageRef} src={recogData.url} />
            <canvas ref={canvasRef} />
          </div>
        </div>
      )}
    </div>
  );
};
