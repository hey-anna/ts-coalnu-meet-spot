import React, { Suspense } from 'react';
import './styles/App.css';
import { Route, Routes } from 'react-router';
import JoinPage from './Pages/auth/JoinPage';
import LoginPage from './Pages/auth/LoginPage';

const MainPage = React.lazy(() => import('./Pages/main/MainPage'));
// const TestPage = React.lazy(() => import('./pages/test/testPage'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/test" element={<TestPage />} /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
