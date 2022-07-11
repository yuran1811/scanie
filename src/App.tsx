import { HomePage } from '@/pages';
import { publicRoutes } from '@/routes';
import MainLayout from '@cpns/layouts/MainLayout';
import { ErrorContent } from '@cpns/shared';
import { Outlet, Route, Routes } from 'react-router-dom';

const App = () => (
  <div className="App">
    <MainLayout>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          {publicRoutes.map(({ component: Page, path }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Route>
        <Route path="*" element={<ErrorContent />} />
      </Routes>
      <Outlet />
    </MainLayout>
  </div>
);

export default App;
