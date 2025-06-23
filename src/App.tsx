import React, { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';

const MainPage = React.lazy(() => import('./Pages/main/mainPage'));
const TestPage = React.lazy(() => import('./Pages/test/testPage'));

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
