import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import TaskRow from '../Components/TaskRow';
import { HubConnectionBuilder } from '@microsoft/signalr';

function Home() {

    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');    
    const connectionRef = useRef(null);

    const updateTasks = () => connectionRef.current.invoke('taskUpdated');

    useEffect(() => {
        async function getTasks() {
            const {data} = await axios.get('/api/tasks/getall');
            setTasks(data);
        }

        async function connectToHub() {
            const connection = new HubConnectionBuilder().withUrl("/tasks").build();
            await connection.start();
            connectionRef.current = connection;

            connection.on('updatedTasks', tasks => {
                setTasks(tasks);
            });
        }

        getTasks();
        connectToHub();
    }, []);

    async function onAddTaskClick() {
        await axios.post('/api/tasks/add', { title: taskTitle });
        setTaskTitle('');
        updateTasks();
    }

    async function onStartTaskClick(id) {
        await axios.post('/api/tasks/starttask', { id });
        updateTasks();
    }

    async function onCompleteTaskClick(id) {
        await axios.post('/api/tasks/completetask', { id });
        updateTasks();
    }

    return <div className='container'>
        <div className='row mt-5'>
            <div className='col-md-10'>
                <input type='text' className='form-control' placeholder='Task Title' value={taskTitle} onChange={e => setTaskTitle(e.target.value)} />
            </div>
            <div className='col-md-2'>
                <button className='btn btn-primary' onClick={onAddTaskClick}>Add Task</button>
            </div>
        </div>
        <table className='mt-3 table table-bordered table-hover'>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(t => {
                    return <TaskRow
                        key={t.id}
                        task={t}
                        onStartTaskClick={() => onStartTaskClick(t.id)}
                        onCompleteTaskClick={() => onCompleteTaskClick(t.id)} />
                })}
            </tbody>
        </table>
    </div>
}

export default Home;