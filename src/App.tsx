import React, { Suspense } from 'react';
import './styles/App.css';
import { Route, Routes } from 'react-router';
import AppLayout from './layout/AppLayout';

const MainPage = React.lazy(() => import('./Pages/main/mainPage'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<MainPage/>}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
