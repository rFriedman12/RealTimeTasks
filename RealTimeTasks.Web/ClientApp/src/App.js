import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Layout from './Pages/Layout';
import Login from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import { TasksContextComp } from './TasksContext';
import LogOut from './Pages/LogOut';
import Home from './Pages/Home';

function App() {
    return (
        <TasksContextComp>
            <Layout>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/logout' component={LogOut} />
            </Layout>
        </TasksContextComp>
    );
}

export default App;