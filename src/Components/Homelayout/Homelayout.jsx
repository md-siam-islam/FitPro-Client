import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Fotter/Footer';

const Homelayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-288px)] w-full'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Homelayout;