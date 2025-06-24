import React, { Suspense } from 'react';
import './styles/App.css';
import { Route, Routes } from 'react-router';
import JoinPage from './Pages/auth/JoinPage';
import LoginPage from './Pages/auth/LoginPage';
import AppLayout from './layout/AppLayout';
import StationTest from './Pages/test/StationTest';

const MainPage = React.lazy(() => import('./Pages/main/mainPage'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<MainPage />}></Route>
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/stationTest" element={<StationTest />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
