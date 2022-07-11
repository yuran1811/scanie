import { recognize } from '@/utils/judge';
import { ErrorMessage } from '@cpns/interfaces';
import { Button, ProgressBar } from '@cpns/shared';
import { useCallback, useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import ImageUpload from './ImageUpload';
import TesseractResult from './TesseractResult';

export const JudgeContainer = () => {
  const [recogResult, setRecogResult] = useState<Tesseract.Page | null>(null);
  const [imagePath, setImagePath] = useState('');
  const [isConvert, setConvert] = useState(false);
  const [progress, setProgress] = useState({
    value: 0,
    status: '',
    error: {
      isError: false,
      errorMessage: '',
    },
  });

  const imageRef = useRef<HTMLImageElement>(null);

  const handleChange = useCallback((e: any) => {
    const imgUrl = URL.createObjectURL(e.target.files[0]);

    setRecogResult(null);
    setImagePath(imgUrl);
    setConvert(true);
    setProgress((s) => ({
      ...s,
      value: 0,
      status: '',
    }));
  }, []);

  const handleClick = useCallback(async () => {
    try {
      setRecogResult(null);
      setConvert(false);

      const data = await recognize(imagePath, (m: any) => {
        setProgress((s) => ({
          ...s,
          value: m.progress,
          status: m.status,
        }));
      });
      if (!data) return;

      setRecogResult(data);
    } catch (error) {
      console.log(error + '');
      setProgress({
        value: 0,
        status: '',
        error: {
          isError: true,
          errorMessage: error + '',
        },
      });
    } finally {
      setConvert(true);
    }
  }, [imagePath]);

  return (
    <main className="p-8">
      <ImageUpload imageRef={imageRef} imagePath={imagePath} onChange={handleChange} />

      <div className="w-full flex flex-col items-center justify-start mb-12">
        {isConvert && (
          <Button className="font-semibold p-6 m-6 rounded-[1rem]" onClick={handleClick}>
            Convert to text
          </Button>
        )}

        {!!progress.status && !progress.error.isError && !recogResult && (
          <ProgressBar value={progress.value} status={progress.status} />
        )}

        {progress.error.isError && <ErrorMessage content={progress.error.errorMessage} />}
      </div>

      <TesseractResult recogResult={recogResult} />
    </main>
  );
};
