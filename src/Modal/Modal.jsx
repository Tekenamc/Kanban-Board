import { useState, useEffect } from 'react';
import "./modal.css";
import { useTaskStore } from "../taskStore";
import { useModalStore } from '../modalStore.js';



export const Modal = ({ status }) => {
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const tasks = useTaskStore(state => state.tasks);
    const deleteTask = useTaskStore(state => state.deleteTask);
    const updateTask = useTaskStore(state => state.updateTask);
    const edit = useModalStore(state => state.edit);// To know whether a task is being edited or not
    const addTask = useTaskStore(state => state.addTask);
    const setAdding = useModalStore(state => state.setAdding);
    const setEdit = useModalStore(state => state.setEdit);
    const tempId = useModalStore(state => state.tempId);

    //If we are editing a task grab the info of the task 
    useEffect(() => {
        if(edit){
            const task = tasks.find(task => task.id === tempId);
            setTaskName(task.name);
            setTaskDesc(task.desc);
        }
    }, [tempId])


    
    //Finished adding a task
    function handleFinish(){
        if(taskName.trim() === ""){ return }

        const newTask = {name: taskName, desc: taskDesc, status: status};

        console.log(tasks);

        addTask(newTask);

        
        
        setTaskName("");
        setTaskDesc("");

        
    }

    //Finished editing a task
    function handleEdit(tempId){
        if(taskName.trim() === ""){ return }

        const newTask = {name: taskName, desc: taskDesc};

        updateTask(tempId, newTask);

    }

        //Delete a task
    function handleDeleteTask(tempId){
        deleteTask(tempId);
    }


    //Change state as typing the title of task
    function handleTaskChange(event){
        setTaskName(event.target.value);
    }

    //Change state as typing the description of task
    function handleDescChange(event){
        setTaskDesc(event.target.value);
    }


    return (
        <div className='backdrop'>
            <div className='editor'>
                <h2>Add your Task</h2>
                <input placeholder='Enter Task name' value={taskName} onChange={handleTaskChange}></input><br/>
                <input type='text' placeholder='Enter description' value={taskDesc} onChange={handleDescChange}></input>
                <div className='footer'>
                    {edit ? //Are we editing a task? if edit true do this:
                        <>
                            <button onClick ={() => {
                                setAdding(false);
                                setEdit(false);
                                handleEdit(tempId);
                                setTaskName("");
                                setTaskDesc("");
                            }}> 
                            Done
                            </button>
                            <button className='cancelBtn' onClick ={() => {
                                setAdding(false); 
                                setEdit(false);
                                setTaskName("");
                                setTaskDesc("");
                                handleDeleteTask(tempId);
                            }}>Delete</button>
                        </>
                    
                    : //If edit false meanning we are nto editing a task do this:

                        <>
                            <button onClick ={() => {
                                setAdding(false);
                                handleFinish();
                            }}> 
                            Finish
                            </button>
                            <button className='cancelBtn' onClick ={() => setAdding(false)}>Cancel</button>
                        </>           
                    
                    }
                </div>
                
            </div>
        </div>
    )
    
}
