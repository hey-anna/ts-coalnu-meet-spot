import React, { Suspense } from 'react';
import './styles/App.css';
import { Route, Routes } from 'react-router';
import AppLayout from './layout/AppLayout';
import StationMeetResultPage from './Pages/meetup/StationMeetResultPage';
import TestPage from './Pages/test/TestPage';
import MainPage from './Pages/main/MainPage';

const JoinPage = React.lazy(() => import('./Pages/auth/JoinPage'));
const LoginPage = React.lazy(() => import('./Pages/auth/LoginPage'));
const YejinTestPage = React.lazy(
  () => import('./Pages/yejinTest/YejinTestPage'),
);

// 파일변경 필요 업로드용 주석

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<MainPage />}></Route>
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/meetup/result" element={<StationMeetResultPage />} />
          <Route path="/yejintest" element={<YejinTestPage />} />
          <Route path="/yejintest" element={<YejinTestPage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
