import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import "./Card.css";


export const Card = ({ taskName, taskDesc, onClick, taskId }) => {

	const { attributes, listeners, setNodeRef, transform } = useSortable({
		id: taskId
	});

	const style = transform ? {
		transform: `translate(${transform.x}px, ${transform.y}px)`,
	} : undefined

	return (
		<div className="card"
		
			onClick={onClick}
			ref = { setNodeRef } 
			style={style}>
			
			<button className="startDrag"

				{ ...attributes } 
				{ ...listeners }>	
				::
			</button>

			<div className="text">
				<h2>{taskName}</h2>
				<p>{taskDesc}</p>
			</div>
			
		</div>
	)
}
