import Navbar from './Components/Layout/NavigationComponents/Navbar/Navbar';
import Sidebar from './Components/Layout/NavigationComponents/Sidebar/Sidebar';
import Users from './Components/Library/Users/UserList';
import './Sass/styles.css';

function App() {
  return (
    <div className='body'>
      <Navbar />
      <Sidebar />
    </div>
  );
}

export default App;
