import { Button, ProgressBar } from '@cpns/shared';
import { useCallback, useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import ImageUpload from './ImageUpload';
import TesseractResult from './TesseractResult';

export const JudgeContainer = () => {
  const [text, setText] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [progress, setProgress] = useState({ value: 0, status: '' });

  const imageRef = useRef<HTMLImageElement>(null);

  const handleChange = useCallback((e: any) => {
    imagePath && URL.revokeObjectURL(imagePath);
    const imgUrl = URL.createObjectURL(e.target.files[0]);

    setImagePath(imgUrl);
    setText('');
    setProgress({ value: 0, status: '' });
  }, []);

  const handleClick = useCallback(() => {
    setText('');

    Tesseract.recognize(imagePath, 'eng', {
      logger: (m) => {
        setProgress({
          value: m.progress,
          status: m.status,
        });
      },
    })
      .then((resp) => {
        if (!resp) return;

        const { data } = resp as Tesseract.RecognizeResult;
        setText(data.text);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }, [imagePath]);

  return (
    <main className="p-8">
      <ImageUpload imageRef={imageRef} imagePath={imagePath} onChange={handleChange} />

      <div className="w-full flex flex-col items-center justify-start mb-12">
        {!!imagePath && (
          <Button className="font-semibold p-6 m-6 rounded-[1rem]" onClick={handleClick}>
            Convert to text
          </Button>
        )}

        {!!progress.status && !text && (
          <ProgressBar value={progress.value} status={progress.status} />
        )}
      </div>

      <TesseractResult text={text} />
    </main>
  );
};
