import "./column.css";
import { Card } from "./Card/Card.jsx";
import { useTaskStore } from "../taskStore"
import { useModalStore } from '../modalStore.js';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core";


export const Column = ({ columnClass, columnStatus }) => {

    const tasks = useTaskStore(state => state.tasks);
    const setAdding = useModalStore(state => state.setAdding);
    const setEdit = useModalStore(state => state.setEdit);
    const getTempId = useModalStore(state => state.getTempId);

    const { setNodeRef } = useDroppable ({
        id: columnStatus
    })


    return (
        <div ref = {setNodeRef} className={columnClass}>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                <ol>
                    {(tasks.filter(task => task.status===columnStatus)).map((task, _) => 
                        
                        <Card 
                            taskName = {task.name}
                            taskDesc = {task.desc}
                            taskId = {task.id}
                            key={task.id} 

                            onClick={() =>{
                                getTempId(task.id);
                                setEdit(true);
                                setAdding(true);
                            }
                        }/>


                        
                    )}
                </ol>
            </SortableContext>
                

        </div>
        
    )
}
