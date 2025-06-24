import React, { Suspense } from 'react';
import './styles/App.css';
import { Route, Routes } from 'react-router';

const MainPage = React.lazy(() => import('./Pages/main/MainPage'));
const TestPage = React.lazy(() => import('./Pages/test/TestPage'));
const StationTest = React.lazy(() => import('./Pages/test/StationTest'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/stationTest" element={<StationTest />} />
      </Routes>
    </Suspense>
  );
}

export default App;
