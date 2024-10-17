import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingScreen from "./presentation/screen/landing/LandingScreen";
import './App.css';
import Dashboard from "./presentation/components/Admin/layout/Dashboard";
import SingleProperty from "./presentation/components/Admin/pages/SingleProperty";
import LogsPage from "./presentation/components/Admin/pages/LogsPage";
import MainContainer from "./presentation/components/Admin/pages/MainContainer";
import AllProperties from "./presentation/components/Admin/pages/AllProperties";
import ConfigureProperties from "./presentation/components/Admin/pages/ConfigureProperties";
import CitiesManagement from "./presentation/components/Admin/pages/CitiesManagement";
import NewsletterManagement from "./presentation/components/Admin/pages/NewsletterManagement";
import TrafficChart from "./presentation/components/Admin/pages/TrafficChart";
import DocumentsManagement from "./presentation/components/Admin/pages/DocumentsManagement";
import PropertiesScreen from "./presentation/screen/properties/PropertiesScreen";
import FormSubmission from "./presentation/components/Admin/pages/FormSubmission";
import ProtectedRoute from "./ProtectedRoute"; // Ensure this imports your ProtectedRoute correctly
import NotFound from "./presentation/components/NotFound";
import LoginPage from "./presentation/components/LoginPage"; // This can be your main Admin landing page

function App() {
    return (
        <div className={'App'}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LandingScreen/>}/>
                    <Route path={'/properties'} element={<PropertiesScreen/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/> {/* Add Login route */}

                    {/* Protect the entire /admin path */}
                    <Route path="/admin" element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <Dashboard/>
                        </ProtectedRoute>
                    }>
                        {/* Nested routes for the dashboard */}
                        <Route path="dashboard" element={<MainContainer/>}/>
                        <Route path="properties/:propertyId" element={<SingleProperty/>}/>
                        <Route path="logs" element={<LogsPage/>}/>
                        <Route path="all-properties" element={<AllProperties/>}/>
                        <Route path="configure-properties" element={<ConfigureProperties/>}/>
                        <Route path="cities" element={<CitiesManagement/>}/>
                        <Route path="newsletter" element={<NewsletterManagement/>}/>
                        <Route path="form-submission" element={<FormSubmission/>}/>
                        <Route path="graphs" element={<TrafficChart/>}/>
                        <Route path="documents" element={<DocumentsManagement/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/> {/* Create a NotFound component for better UX */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
