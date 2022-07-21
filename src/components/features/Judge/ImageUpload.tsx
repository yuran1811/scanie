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
    <div className="w-full flex flex-col items-center justify-start mb-12">
      <div className="flex items-center justify-start border-ct-color border-[0.4rem] rounded-[1rem] mb-8 w-full sm:w-auto">
        <label className="hidden sm:block cursor-pointer font-semibold px-4" htmlFor="upload-image">
          Choose image
        </label>
        <input
          className="cursor-pointer flex-1 w-full p-4 bg-ct-color text-ct-bg-800"
          id="upload-image"
          type="file"
          onChange={onChange}
        />
      </div>

      {!!imagePath && (
        <div className="flexcentercol gap-6 border-[2px] border-ct-bg-800 p-6">
          <img ref={imageRef} className="w-full max-w-[50rem]" src={imagePath} />
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
