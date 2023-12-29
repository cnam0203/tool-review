import React, { useContext } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage';
import AdminPage from './pages/AdminPage';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import ProfilePage from './pages/ProfilePage';
import ProjectPage from './pages/ProjectPage';
import AppContext from './AppContext';
import MemberPage from './pages/MemberPage';
import MainPage from './pages/MainPage';
import ReferencePage from './pages/ReferencePage';
import ReferenceInfo from './pages/ReferenceInfo';
import UploadPage from './pages/UploadPage';
import ReferenceSearch from './pages/ReferenceSearch';
import PracticalScreen from './pages/PracticalScreen';
import FullTextScreen from './pages/FullTextScreen';
import ReferenceFullScreen from './pages/ReferenceFullScreen';

function AppRouter() {
    const { token, role } = useContext(AppContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        token ? <Navigate to="/" /> : <LoginForm/>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        token ? <Navigate to="/" /> : <SignupForm/>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        token ? <ProfilePage/> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/projects"
                    element={
                        token ? <ProjectPage/> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/project_info"
                    element={
                        token ? <MemberPage/> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/initiation"
                    element={
                        token ? <MainPage/> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/references"
                    element={
                        token ? <ReferencePage/> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/reference"
                    element={
                        token ? <ReferenceInfo/> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/upload-references"
                    element={
                        token ? <UploadPage/> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/find-references"
                    element={
                        token ? <ReferenceSearch/> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/practical-screen"
                    element={
                        token ? <PracticalScreen/> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/fulltext-screen"
                    element={
                        token ? <FullTextScreen/> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/reference-full-screen"
                    element={
                        token ? <ReferenceFullScreen/> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/"
                    element={
                        token ? 
                        (role === 'admin' ? <AdminPage/> : <TestPage/>)
                        : <Navigate to="/login" />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;