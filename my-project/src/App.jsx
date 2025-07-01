// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskManagerPage from './pages/TaskManagerPage';
import ApiDataPage from './pages/ApiDataPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import { ThemeProvider } from './context/ThemeContext'; // Import our ThemeProvider

function App() {
  return (
    // Wrap the entire application with ThemeProvider for theme context
    <ThemeProvider>
      <Router>
        <Routes>
          {/* MainLayout will provide Navbar and Footer for these routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} /> {/* Default route for "/" */}
            <Route path="tasks" element={<TaskManagerPage />} />
            <Route path="data" element={<ApiDataPage />} />
            <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 pages */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;


      
