import { RootState } from '@shared/types';
import { useSelector } from 'react-redux';
import { RecogItem } from './RecogItem';

export const RecogUpload = () => {
  const { imgSources } = useSelector((s: RootState) => s.imgSources);

  return (
    <div className="container mx-auto my-6 flex flex-wrap items-start justify-center gap-6 p-6 lg:max-w-[75rem]">
      {!imgSources.length && <div className="text-[4rem] font-bold">Upload image to see</div>}

      {imgSources.map((imgSource) => (
        <RecogItem key={imgSource.id} data={imgSource} />
      ))}
    </div>
  );
};
