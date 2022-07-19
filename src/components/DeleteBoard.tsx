import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import { droppableTypes } from '../App';

const Wrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  min-width: 233px;
  display: flex;
  font-size: 50px;
  font-weight: bold;
  color: ${prop => prop.theme.cardColor};
`
interface IAreaProps{
    isDraggingOver : boolean,
    isDraggingFromThisWith: boolean
}
const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver? props.theme.boardDraggingToColor : props.isDraggingFromThisWith? props.theme.boardDraggingFromColor : props.theme.boardContentColor};
    flex-grow: 1;
    padding: 10px 15px;
    transition: background-color 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
interface DeleteBoardProps{
    index : number,
}
function DeleteBoard({index} : DeleteBoardProps){
    return <Draggable key={index} draggableId={String(index)} index={index}>
        {(magic, snapshot) =>
        <Wrapper ref={magic.innerRef }{...magic.dragHandleProps}{...magic.draggableProps}>
            <Droppable  droppableId={"deleteBoard"}>
                {(magic, snapshot) => 
                    <Area
                    isDraggingOver={snapshot.isDraggingOver}
                    isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                    ref={magic.innerRef}
                    {...magic.droppableProps}>
                        🗑              
                    {magic.placeholder}
                    </Area>
                }
            </Droppable>
        </Wrapper>
        }
    </Draggable>
}

export default DeleteBoard