import { useState } from 'react';
import { Column } from './Column/Column.jsx';
import { Modal } from "./Modal/Modal.jsx";
import { useTaskStore } from './taskStore.js';
import { useModalStore } from './modalStore.js';
import { closestCorners, DndContext } from "@dnd-kit/core"
import { arrayMove } from '@dnd-kit/sortable';


function App() {
    const adding = useModalStore(state => state.adding);
    const setAdding = useModalStore(state => state.setAdding);
    const [status, setStatus] = useState("");
    const tasks = useTaskStore(state => state.tasks);
    const setTasks = useTaskStore(state => state.setTasks)
    const moveTasks = useTaskStore(state => state.moveTasks);
    const statusConst = {
        ToDo: "ToDo",
        InProgress: "InProgress",
        Done: "Done",
    };

    const handleDragEnd = event => {
        const { active, over } = event;

        if (!over || over.id === active.id) return; //let go at the same position it was originally

        const task = tasks.find(task => task.id === active.id);

        if(!task) {return}

        if(typeof over.id === "string"){
            if(task.status !== over.id){
                
                moveTasks(active.id, over.id, tasks);
                return;
            }
        }
        
        setTasks( tasks => {
            const originalPos = tasks.findIndex(task => task.id === active.id);
            const newPos = tasks.findIndex(task => task.id === over.id);

            return arrayMove(tasks, originalPos, newPos);
        })
        

    }


///RENDER
    return (
        <div className="kanbanContainer">
            <h1>Kanban-Board</h1>

            <div className="kanbanBoard">

                <div className='bHeaders'>
                    <h2  className='bHeader'>To Do</h2>
                    <button 
                        onClick={ () =>{
                            setStatus(statusConst.ToDo);
                            setAdding(true);
                        }}>
                        Add
                    </button>
 
                </div>

                <div className='pHeaders'>
                    <h2 className='pHeader'>In Progress</h2>
                    <button 
                        onClick={ () =>{
                            setStatus(statusConst.InProgress);
                            setAdding(true);
                        }}>
                        Add
                    </button>

                </div>

                <div className='cHeaders'>
                    <h2 className='cHeader'>Complete</h2>
                    <button 
                        onClick={ () =>{
                            setStatus(statusConst.Done);
                            setAdding(true);
                        }}>
                        Add
                    </button>
                </div>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                
                <Column
                    columnClass="backLog"
                    columnStatus={statusConst.ToDo}
                />


                <Column
                    columnClass="inProgress"
                    columnStatus={statusConst.InProgress}
        
                />

                <Column
                    columnClass="complete"
                    columnStatus={statusConst.Done}
                />

            </DndContext>
              

                
            </div>

            {adding && ( <Modal status ={status}/> )}

        </div>
    )
}

export default App;
