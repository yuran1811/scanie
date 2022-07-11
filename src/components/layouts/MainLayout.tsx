import { FC, PropsWithChildren } from 'react';
import { Footer, Header } from './partials';

const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div className="relative fullsize overflow-x-hidden text-[3rem] text-ct-color bg-ct-bg-800">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
    <div id="modal-container"></div>
  </>
);

export default MainLayout;
