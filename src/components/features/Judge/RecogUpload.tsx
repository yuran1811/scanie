import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@cpns/shared";
import { RootState } from "@shared/types";
import { RecogItem } from "./RecogItem";

export const RecogUpload = () => {
  const { imgSources } = useSelector((s: RootState) => s.imgSources);

  const [isJudgeAll, setJudgeAll] = useState(false);

  return (
    <div className="flexcentercol gap-4 py-4">
      {!!imgSources.length && !isJudgeAll && (
        <Button className="mx-auto" onClick={() => setJudgeAll(true)}>
          Judge All
        </Button>
      )}

      <div className="flexcentercol container mx-auto gap-6 py-6">
        {!imgSources.length && <div className="text-5xl font-bold">Upload images to see</div>}

        {imgSources.map((imgSource) => (
          <RecogItem key={imgSource.id} data={imgSource} isRecog={isJudgeAll} />
        ))}
      </div>
    </div>
  );
};
