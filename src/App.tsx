import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import PatientDetail from './pages/PatientDetail';
import ChatPage from './pages/ChatPage';
import DocumentationPage from './pages/DocumentationPage';
export function App() {
  return <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patient/:id" element={<PatientDetail />} />
              <Route path="/chat/:id" element={<ChatPage />} />
              <Route path="/documentation" element={<DocumentationPage />} />
              <Route path="/documentation/:id" element={<DocumentationPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>;
}