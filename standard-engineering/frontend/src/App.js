import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import SubmitRequirement from './pages/SubmitRequirement';
import MyOrders from './pages/MyOrders';
import MyQuotations from './pages/MyQuotations';
import Contact from './pages/Contact';
import GatesGrills from './pages/GatesGrills';
import GrillsRailings from './pages/GrillsRailings';
import StructuralSteel from './pages/StructuralSteel';
import GateDetails from './pages/GateDetails';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

// Styles
import './styles/global.css';

const App = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/gates-grills" element={<GatesGrills />} />
            <Route path="/category/grills-railings" element={<GrillsRailings />} />
            <Route path="/category/structural-steel" element={<StructuralSteel />} />
            <Route path="/gate/:gateId" element={<GateDetails />} />

            {/* User Routes */}
            <Route 
              path="/requirements" 
              element={
                <ProtectedRoute>
                  <SubmitRequirement />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/quotations" 
              element={
                <ProtectedRoute>
                  <MyQuotations />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/admin/products" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/admin/orders" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminOrders />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
