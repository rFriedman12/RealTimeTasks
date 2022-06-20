import axios from 'axios';
import React, { useEffect } from 'react';
import { useTasksContext } from '../TasksContext';

function LogOut() {

    const {setUser} = useTasksContext();

    useEffect(() => {
        async function logOut() {
            await axios.post('/api/account/logout');
            setUser(null);
        }

        logOut();
    }, []);

    return <></>
}

export default LogOut;