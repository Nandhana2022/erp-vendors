import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './features/auth/Login';
import VendorsList from './features/vendors/VendorsList';
import VendorForm from './features/vendors/VendorForm';
import VendorDetails from './features/vendors/VendorDetails';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/vendors"
          element={
            <ProtectedRoute>
              <Layout>
                <VendorsList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendors/new"
          element={
            <ProtectedRoute>
              <Layout>
                <VendorForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendors/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <VendorForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendors/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <VendorDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/vendors" />} />
        <Route path="*" element={<Navigate to="/vendors" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;