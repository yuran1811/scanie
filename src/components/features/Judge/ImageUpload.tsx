import { InputProps } from '@shared/types';
import { FC, memo, RefObject } from 'react';

interface ImageUploadProps {
  imagePath: string;
  imageRef: RefObject<HTMLImageElement>;
}

const ImageUpload: FC<ImageUploadProps & InputProps> = ({ imageRef, imagePath, onChange }) => (
  <div className="w-full flex flex-col items-center justify-start mb-12">
    <div className="flex items-center justify-start border-ct-color border-[0.4rem] rounded-[1rem] mb-8 w-full sm:w-auto">
      <label className="hidden sm:block cursor-pointer px-4" htmlFor="upload-image">
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
      <div className="border-[2px] border-ct-bg-800 p-6">
        <img ref={imageRef} className="w-full max-w-[50rem]" src={imagePath} />
      </div>
    )}
  </div>
);

export default memo(ImageUpload);
