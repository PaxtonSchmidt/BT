import { Route, Routes } from 'react-router-dom';
import Hamburger from './Components/Layout/NavigationComponents/Hamburger';
import Navbar from './Components/Layout/NavigationComponents/Navbar/Navbar';
import Sidebar from './Components/Layout/NavigationComponents/Sidebar/Sidebar';
import DashboardPage from './Components/Layout/Pages/DashboardPage';
import ManageTeamPage from './Components/Layout/Pages/ManageTeamPage';
import ProjectsPage from './Components/Layout/Pages/ProjectsPage';
import TicketsPage from './Components/Layout/Pages/TicketsPage';
import './Sass/styles.css';

function App() {
  return (
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
  );
}

export default App;
