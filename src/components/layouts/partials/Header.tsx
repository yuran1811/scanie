import { publicRoutes } from '@/routes';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Header: FC = () => (
  <header className="sticky top-0 left-0 z-[100] flex w-full flex-wrap items-center justify-start border-b-[2px] border-ct-color bg-ct-bg-800 p-4">
    {publicRoutes.map(({ path: { index } }) => (
      <NavLink
        key={index}
        to={`/${index}`}
        className={({ isActive }) =>
          `mx-4 w-full p-4 text-center font-semibold capitalize text-ct-color sm:w-auto ${
            isActive ? 'underline underline-offset-8' : ''
          }`
        }
      >
        {index}
      </NavLink>
    ))}
  </header>
);
