import { JudgeBubble } from '@cpns/features/Judge/JudgeBubble';
import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { Footer, Header } from './partials';

const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div className="fullsize relative overflow-x-hidden bg-ct-bg-800 text-[3rem] text-ct-color">
      <Header />
      <div>{children}</div>
      <Footer />
      <JudgeBubble />
    </div>

    <div id="modal-container"></div>
    <ToastContainer theme="dark" />
  </>
);

export default MainLayout;
