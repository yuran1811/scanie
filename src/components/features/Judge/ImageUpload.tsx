import { preprocessImage } from '@/utils';
import { InputProps } from '@shared/types';
import { FC, RefObject, useEffect } from 'react';

interface ImageUploadProps {
  isShow?: boolean;
  imagePath: string;
  imageRef: RefObject<HTMLImageElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
}

const ImageUpload: FC<ImageUploadProps & InputProps> = ({
  imageRef,
  canvasRef,
  imagePath,
  onChange,
}) => {
  useEffect(() => {
    if (!canvasRef.current || !imageRef.current) return;

    canvasRef.current.width = 500;
    canvasRef.current.height = 375;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const img = new Image(canvasRef.current.width, canvasRef.current.height);
    img.src = imagePath;
    img.onload = () => {
      if (!canvasRef.current) return;

      canvasRef.current.width = img.naturalWidth;
      canvasRef.current.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);
      const preprocessedImage = preprocessImage(canvasRef.current);
      if (!preprocessedImage) return;

      ctx.putImageData(preprocessedImage, 0, 0);
    };
  }, [imagePath]);

  return (
    <div className="mb-4 flex w-full flex-col items-center justify-start">
      <div className="mb-8 flex w-full items-center justify-start rounded-[2rem] border-4 border-ct-color sm:w-auto">
        <label className="hidden cursor-pointer px-4 font-semibold sm:block" htmlFor="upload-image">
          Choose images
        </label>
        <input
          className="flex-1 cursor-pointer rounded-[1.4rem] bg-ct-color py-6 px-4 text-ct-bg-800"
          id="upload-image"
          type="file"
          multiple
          onChange={onChange}
        />
      </div>

      {!!imagePath && (
        <div className="flexcentercol !hidden gap-6 border-2 border-ct-bg-800 p-6">
          <img ref={imageRef} className="w-full max-w-[50rem]" src={imagePath} />
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
