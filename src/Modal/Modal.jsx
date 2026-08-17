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
    const edit = useModalStore(state => state.edit);
    const addTask = useTaskStore(state => state.addTask);
    const setAdding = useModalStore(state => state.setAdding);
    const setEdit = useModalStore(state => state.setEdit);
    const tempId = useModalStore(state => state.tempId);

    useEffect(() => {
        if(edit){
            const task = tasks.find(task => task.id === tempId);
            setTaskName(task.name);
            setTaskDesc(task.desc);
        }
    }, [tempId])

    useEffect(() => {
        localStorage.setItem("tasks",JSON.stringify(tasks));

    }, [tasks])


    function handleFinish(){
        if(taskName.trim() === ""){ return }

        const newTask = {name: taskName, desc: taskDesc, status: status};

        console.log(tasks);

        addTask(newTask);

        
        
        setTaskName("");
        setTaskDesc("");

        
    }

    function handleEdit(tempId){
        if(taskName.trim() === ""){ return }

        const newTask = {name: taskName, desc: taskDesc};

        updateTask(tempId, newTask);

    }

    function handleTaskChange(event){
        setTaskName(event.target.value);
    }

    function handleDescChange(event){
        setTaskDesc(event.target.value);
    }

    function handleDeleteTask(tempId){
        deleteTask(tempId);
    }

    return (
        <div className='backdrop'>
            <div className='editor'>
                <h2>Add your Task</h2>
                <input placeholder='Enter Task name' value={taskName} onChange={handleTaskChange}></input><br/>
                <input type='text' placeholder='Enter description' value={taskDesc} onChange={handleDescChange}></input>
                <div className='footer'>
                    {edit ? 
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
                    
                    : 

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
