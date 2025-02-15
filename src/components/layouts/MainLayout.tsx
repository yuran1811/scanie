import { FC, PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

import { Footer, Header } from "./partials";

const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div className="fullsize relative overflow-x-hidden">
      <Header />
      <main className="min-h-[calc(100dvh-220px)]">{children}</main>
      <Footer />
    </div>

    <div id="modal-container"></div>
    <ToastContainer theme="dark" />
  </>
);

export default MainLayout;
