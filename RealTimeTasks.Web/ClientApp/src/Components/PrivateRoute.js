import React from 'react';
import { useTasksContext } from '../TasksContext';
import LogIn from '../Pages/LogIn';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component, ...options }) => {
    const { user } = useTasksContext();
    const finalComponent = !!user ? component : LogIn;
    return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;