import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useLocation } from 'react-router-dom';
import useTrainer from '../Hook/Usetrainer/useTrainer';

const TrainersRout = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()
    const [isTrainer,isTrainerLoading] = useTrainer()
    if(loading || isTrainerLoading){
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
    if(user && isTrainer){
        return children
      }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default TrainersRout;