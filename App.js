import './App.css';
import CouponManagement from './coupon-management-admin/CouponManagement';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Coupon Management System</h1>
      </header>
      <main className="container mt-4">
        <CouponManagement />
      </main>
      <footer className="text-center mt-5 mb-3">
        <p>&copy; {new Date().getFullYear()} Coupon App</p>
      </footer>
    </div>
  );
}

export default App;
