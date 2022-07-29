import { addImgSource } from '@/redux/imgSourcesSlice';
import { Button } from '@cpns/shared';
import { InputProps } from '@shared/types';
import { FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

interface ImageUploadProps {}

const ImageUpload: FC<ImageUploadProps & InputProps> = () => {
  const [canUpload, setCanUpload] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const uploadHandle = () => {
    urls.forEach((url) => dispatch(addImgSource({ url })));

    inputRef.current && (inputRef.current.value = '');
    setCanUpload(false);
  };

  const handleChange = (e: any) => {
    urls.forEach((url) => URL.revokeObjectURL(url));

    const { files } = e.target;

    if (!files.length) {
      setCanUpload(false);
      return;
    }

    setCanUpload(true);

    const tmpUrls = [] as string[];
    for (const file of files) {
      const url = URL.createObjectURL(file);
      tmpUrls.push(url);
    }

    setUrls(tmpUrls);
  };

  return (
    <div className="mb-4 flex w-full max-w-[35rem] flex-col items-center justify-start">
      <div className="mb-8 flex w-full items-center justify-start rounded-[2rem] border-4 border-ct-color">
        <label className="hidden cursor-pointer px-4 font-semibold sm:block" htmlFor="upload-image">
          Choose images
        </label>
        <input
          ref={inputRef}
          className="flex-1 cursor-pointer rounded-[1.4rem] bg-ct-color py-6 px-4 text-ct-bg-800"
          id="upload-image"
          type="file"
          multiple
          onChange={handleChange}
        />
      </div>

      {canUpload && (
        <Button className="m-6 rounded-[1rem] p-6 text-[3rem] font-semibold" onClick={uploadHandle}>
          Upload
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
