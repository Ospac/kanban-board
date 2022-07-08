import {Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  padding-top: 15px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`
interface IAreaProps{
    isDraggingOver : boolean,
    isDraggingFromThisWith: boolean
}
const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver? props.theme.boardDraggingToColor : props.isDraggingFromThisWith? props.theme.boardDraggingFromColor : props.theme.boardContentColor};
    flex-grow: 1;
    padding: 10px 10px;
    transition: background-color 0.3s ease-in-out;
`
const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;

`
interface IBoardProps {
    toDos : string[];
    boardId: string;
}
function Board({toDos, boardId} : IBoardProps){
    return <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>{(magic, snapshot) => 
                <Area 
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef }
                {...magic.droppableProps}>
                    {toDos.map((todo, index) => 
                        <DraggableCard key={todo} todo={todo} index={index}/>
                    )}
                {magic.placeholder}
                </Area>
            }
        </Droppable>
      </Wrapper>
}

export default Board