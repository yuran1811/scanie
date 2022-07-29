import { deleteImgSource, updateImgSource } from '@/redux/imgSourcesSlice';
import { preprocessImage, recognize } from '@/utils';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, ProgressBar } from '@cpns/shared';
import { ImgSourcesProps, RecogResultType } from '@shared/types';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RecogResult } from './RecogResult';

interface RecogItemProps {
  data: ImgSourcesProps;
}

export const RecogItem: FC<RecogItemProps> = ({ data: recogData }) => {
  const [recogResult, setRecogResult] = useState<{ result: RecogResultType }>({
    result: recogData.recogResult || [],
  });
  const [isConvert, setConvert] = useState(true);
  const [progress, setProgress] = useState({
    value: 0,
    status: '',
    error: {
      isError: false,
      errorMessage: '',
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

      const dataURI = canvasRef.current.toDataURL('image/jpeg');

      const data = await recognize(dataURI, (m: any) => {
        setProgress((s) => ({ ...s, value: m.progress, status: m.status }));
      });
      if (!data) return;
      console.log('data: ', data);

      setRecogResult({
        result: data.lines.map((line) => ({ text: line.text })),
      });
    } catch (error) {
      console.log(error + '');

      setProgress({
        value: 0,
        status: '',
        error: { isError: true, errorMessage: error + '' },
      });
    } finally {
      setConvert(true);
    }
  };

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !imageRef || !imageRef.current) return;

    canvasRef.current.width = 500;
    canvasRef.current.height = 375;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const img = new Image(canvasRef.current.width, canvasRef.current.height);
    img.src = recogData.url;
    img.onerror = () => {
      !recogData.recogResult.length && dispatch(deleteImgSource(recogData.id));

      imageRef.current?.style &&
        Object.assign(imageRef.current.style, {
          display: 'none',
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
    <div className="group min-h-[13rem] w-full max-w-[35rem] rounded-[2.6rem] border-4 border-sky-200 border-t-transparent transition-all">
      <div className="relative flex w-full flex-col items-center justify-start">
        {isConvert && !recogData.recogResult.length && (
          <Button
            className="m-6 rounded-[1rem] p-6 text-[3rem] font-semibold"
            onClick={handleClick}
          >
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
          <div className="flexcentercol absolute -bottom-[32rem] left-0 z-20 !hidden max-w-[40rem] !justify-start gap-4 p-4 group-hover:!flex">
            <img className="w-full" src={recogData.url} />

            <div className="!hidden">
              <img ref={imageRef} className="w-full" src={recogData.url} />
              <canvas ref={canvasRef} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
