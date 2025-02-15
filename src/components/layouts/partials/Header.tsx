import { FC } from "react";
import { NavLink } from "react-router-dom";

import { publicRoutes } from "@/routes";
import { JudgeBubble } from "@cpns/features/Judge/JudgeBubble";

export const Header: FC = () => (
  <header className="border-ct-color bg-ct-bg-800 xs:justify-between sticky top-0 left-0 z-100 flex w-full flex-wrap items-center justify-center gap-4 border-b-[2px] px-6 py-4">
    <nav>
      <ul className="flexcenter flex-wrap gap-6">
        {publicRoutes.map(({ label, path: { index } }) => (
          <li key={index}>
            <NavLink
              to={`${index}`}
              className={({ isActive }) =>
                `text-center font-semibold capitalize ${
                  isActive ? "underline underline-offset-8" : ""
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>

    <JudgeBubble />
  </header>
);
