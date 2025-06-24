import React, { Suspense } from 'react';
import './styles/App.css';
import { Route, Routes } from 'react-router';

const MainPage = React.lazy(() => import('./pages/main/MainPage'));
const TestPage = React.lazy(() => import('./pages/test/testPage'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
