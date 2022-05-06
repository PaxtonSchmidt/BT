import { ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Hamburger from './Components/Layout/NavigationComponents/Hamburger';
import Navbar from './Components/Layout/NavigationComponents/Navbar/Navbar';
import Sidebar from './Components/Layout/NavigationComponents/Sidebar/Sidebar';
import DashboardPage from './Components/Layout/Pages/DashboardPage/DashboardPage';
import ManageTeamPage from './Components/Layout/Pages/ManageTeamPage/ManageTeamPage';
import ProjectsPage from './Components/Layout/Pages/ProjectsPage/ProjectsPage';
import TicketsPage from './Components/Layout/Pages/TicketsPage/TicketsPage';
import './Sass/styles.css';
import { theme } from './theme';

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <div className='body'>
        <Navbar />
        <Hamburger />
        <Sidebar />

        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='tickets' element={<TicketsPage />} />
          <Route path='projects' element={<ProjectsPage />} />
          <Route path='team' element={<ManageTeamPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
