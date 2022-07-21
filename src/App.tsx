import { HomePage } from '@/pages';
import { publicRoutes } from '@/routes';
import MainLayout from '@cpns/layouts/MainLayout';
import { ErrorContent } from '@cpns/shared';
import { Outlet, Route, Routes } from 'react-router-dom';

const App = () => (
  <MainLayout>
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        {publicRoutes.map(({ path, component: Page }) => (
          <Route key={path.index} path={path.index}>
            <Route index element={<Page />} />
            {Object.values(path.others || {}).map(({ path: childPath, component: ChildPage }) => (
              <Route key={path.index + childPath} path={childPath} element={<ChildPage />} />
            ))}
          </Route>
        ))}
      </Route>
      <Route path="*" element={<ErrorContent />} />
    </Routes>
    <Outlet />
  </MainLayout>
);

export default App;
