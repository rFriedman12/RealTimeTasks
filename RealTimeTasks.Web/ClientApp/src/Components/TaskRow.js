import React from "react";
import { useTasksContext } from '../TasksContext';

function TaskRow({ task, onStartTaskClick, onCompleteTaskClick }) {

    const { user } = useTasksContext();
    const taskNotStarted = task.userId === null;
    const currentUserIsCompleting = !taskNotStarted && task.userId === user.id
    const completingUserName = !taskNotStarted ? `${task.user.firstName} ${task.user.lastName}` : null;

    return <tr>
        <td>{task.title}</td>
        <td>
            {taskNotStarted && <button className='btn btn-info' onClick={onStartTaskClick}>I'm doing this one!</button>}
            {currentUserIsCompleting &&
                <button className='btn btn-success' onClick={onCompleteTaskClick}>I'm Done!</button>}
            {!taskNotStarted && !currentUserIsCompleting &&
                <button className='btn btn-warning' disabled>{`${completingUserName} is doing this one`}</button>}            
        </td>
    </tr>
}

export default TaskRow;