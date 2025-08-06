import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';

// Páginas públicas
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Páginas protegidas
import Dashboard from './pages/dashboard/Dashboard';
import Teams from './pages/teams/Teams';
import Players from './pages/players/Players';
import Tournaments from './pages/tournaments/Tournaments';
import Matches from './pages/matches/Matches';
import Statistics from './pages/statistics/Statistics';
import Financial from './pages/financial/Financial';
import Settings from './pages/settings/Settings';

// Componentes de layout
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Configuración de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Componente principal de la aplicación ProSports
 * Configura todos los providers necesarios y define las rutas
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                {/* Rutas públicas */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <PublicRoute>
                      <ForgotPassword />
                    </PublicRoute>
                  }
                />

                {/* Rutas protegidas */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/teams"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Teams />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/players"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Players />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tournaments"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Tournaments />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/matches"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Matches />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/statistics"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Statistics />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/financial"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Financial />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Settings />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Ruta de carga */}
                <Route
                  path="/loading"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  }
                />

                {/* Ruta 404 */}
                <Route
                  path="*"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                        <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
                        <button
                          onClick={() => window.history.back()}
                          className="btn-primary"
                        >
                          Volver
                        </button>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </div>
          </Router>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App; 