import { FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { addImgSource } from "@/redux/imgSourcesSlice";
import { Button } from "@cpns/shared";
import { InputProps } from "@shared/types";

interface ImageUploadProps {}

const ImageUpload: FC<ImageUploadProps & InputProps> = () => {
  const [canUpload, setCanUpload] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const uploadHandle = () => {
    urls.forEach((url) => dispatch(addImgSource({ url })));

    inputRef.current && (inputRef.current.value = "");
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
    <div className="flex w-full max-w-[35rem] flex-col items-center justify-start gap-4">
      <div className="border-ct-color flex w-full items-center justify-start overflow-hidden rounded-lg border-2">
        <label className="hidden cursor-pointer px-4 font-semibold sm:block" htmlFor="upload-image">
          Choose images
        </label>
        <input
          ref={inputRef}
          className="bg-ct-color text-ct-bg-800 flex-1 cursor-pointer px-4 py-2 outline-none"
          id="upload-image"
          type="file"
          multiple
          onChange={handleChange}
        />
      </div>

      {canUpload && <Button onClick={uploadHandle}>Upload</Button>}
    </div>
  );
};

export default ImageUpload;
