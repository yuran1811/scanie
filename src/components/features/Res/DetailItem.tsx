import { BackIcon, PlusIcon } from '@cpns/icons';
import { Label, SearchBar } from '@cpns/shared';
import { fakeData } from '@shared/constants';
import { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailItemCard } from './DetailItemCard';

export const DetailItem: FC = () => {
  const { resultId } = useParams();

  const navigate = useNavigate();

  const scores = useMemo<
    {
      id: number;
      name: string;
      score: number;
    }[]
  >(() => {
    const data = fakeData.find((item) => item.id + '' === resultId);
    if (!data) return [];

    return data.scores;
  }, [resultId]);

  return (
    <div className="p-4">
      <div className="flexcentercol">
        <div className="select-none flexcenter flex-wrap p-6 m-4 gap-4">
          <BackIcon className="text-sky-200 !my-0 mr-12 scale-75" onClick={() => navigate(-1)} />
          <Label theme="teal">Score</Label>
          <PlusIcon className="cursor-pointer" fill="white" width="45" height="45" />
        </div>
        <SearchBar />
      </div>

      <div className="container mx-auto flexcenter flex-wrap gap-6">
        {scores.map((score) => (
          <DetailItemCard key={score.id} data={score} />
        ))}
      </div>
    </div>
  );
};
