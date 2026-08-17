import { useSortable } from "@dnd-kit/sortable";
import "./Card.css";

//Card component represents the tasks
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
			
			{/* the draggable bit to make the entire card move */}
			<button className="startDrag"

				{ ...attributes } 
				{ ...listeners }>	
				::
			</button>

			{/* Crad info */}
			<div className="text">
				<h2>{taskName}</h2>
				<p>{taskDesc}</p>
			</div>
			
		</div>
	)
}
