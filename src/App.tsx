import React, { Suspense } from 'react';
import './styles/App.css';
import { Route, Routes } from 'react-router';
import AppLayout from './layout/AppLayout';
import StationMeetResultPage from './Pages/meetup/StationMeetResultPage';
import MainPage from './Pages/main/MainPage';
import YejinGetFriendListpage from './Pages/yejinTest/YejinGetFriendListpage';
import YejinDeleteTest from './Pages/yejinTest/YejinDeleteTest';
import AuthGuard from './shared/guard/authGuard';
import YejinInsertUserInfo from './Pages/yejinTest/YejinInsertUserInfo';
import NotFoundPage from './Pages/NotFoundPage';

const JoinPage = React.lazy(() => import('./Pages/auth/JoinPage'));

const LoginPage = React.lazy(() => import('./Pages/auth/LoginPage'));
const FriendGroupPage = React.lazy(
  () => import('./Pages/friend/FriendGroupPage'),
);
const YejinTestPage = React.lazy(
  () => import('./Pages/yejinTest/YejinTestPage'),
);

// 파일변경 필요 업로드용 주석
// 테스트 주석입니다.

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<MainPage />}></Route>
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/friend/group-management"
            element={
              <AuthGuard>
                <FriendGroupPage />
              </AuthGuard>
            }
          />
          <Route path="/meetup/result" element={<StationMeetResultPage />} />
          <Route path="/yejintest">
            <Route index element={<YejinTestPage />} />
            <Route path="get" element={<YejinGetFriendListpage />} />
            <Route path="delete" element={<YejinDeleteTest />} />
            <Route path="insert" element={<YejinInsertUserInfo />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
