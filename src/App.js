import './App.css';
import FeedbackFrom from './FeedbackFrom';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './style.css'
  import 'react-toastify/dist/ReactToastify.css';
import MyNavbar from './comp/MyNavbar';
import Footer from './comp/Footer';

function App() {
  return (
    <>
    <MyNavbar />
    <ToastContainer />
    <div >
   
    <main> 
      <Outlet />
    </main>
      
    </div>
    <Footer />
    
    </>
  );
}

export default App;
