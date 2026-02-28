import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <footer className="footer">
                <div className="container">
                    <p>© 2024 EventHub. All rights reserved.</p>
                </div>
            </footer>
            <style>{`
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #121212;
        }
        .main-content {
          flex: 1;
        }
        .footer {
          background: #1A1A1D;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          color: #B5B5B5;
          padding: 1.5rem 0;
          margin-top: auto;
          text-align: center;
          font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
};

export default MainLayout;