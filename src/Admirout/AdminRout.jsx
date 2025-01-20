import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAdmin from '../Hook/UseAdmin/useAdmin';
import { useLocation } from 'react-router-dom';

const AdminRout = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const [isAdmin,isAdminLoading] = useAdmin()
    const location = useLocation()
    if(loading || isAdminLoading){
        return (
            <div className="flex justify-center items-center min-h-screen">
              <div>
                <span className="loading loading-dots loading-xs"></span>
                <span className="loading loading-dots loading-sm"></span>
                <span className="loading loading-dots loading-md"></span>
                <span className="loading loading-dots loading-lg"></span>
              </div>
            </div>
          );
    }
    if(user && isAdmin){
        return children
      }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default AdminRout;