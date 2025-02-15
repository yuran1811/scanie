import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { BackIcon } from "@cpns/icons";

interface ErrorContentProps {
  errorBoundaries?: boolean;
}

export const ErrorContent: FC<ErrorContentProps> = ({ errorBoundaries = false }) => {
  const navigate = useNavigate();

  return (
    <section className="flex h-full items-center p-16 **:select-none">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
          <p className="mt-4 mb-8 text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>

          <BackIcon
            className="mx-auto"
            onClick={() => {
              if (errorBoundaries) {
                navigate("/");
                window.location.reload();
              } else navigate(-1);
            }}
          >
            Back to homepage
          </BackIcon>
        </div>
      </div>
    </section>
  );
};
