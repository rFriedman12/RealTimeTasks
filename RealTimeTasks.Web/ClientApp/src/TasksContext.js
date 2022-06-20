import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const TasksContext = createContext();

function TasksContextComp({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getCurrentUser() {
            const { data } = await axios.get('/api/account/getcurrentuser');
            setUser(data);
        }

        getCurrentUser();
    }, []);

    return <TasksContext.Provider value={{ user, setUser }}>
        {children}
    </TasksContext.Provider>
}

const useTasksContext = () => useContext(TasksContext);

export { TasksContextComp, useTasksContext };