import {Draggable, Droppable} from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useRecoilState} from 'recoil';
import styled from 'styled-components';
import { droppableTypes } from '../App';
import { boardState, IBoard} from '../atoms';
import { BoardTitle } from './BoardTitle';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div<{isDragging : boolean}>`
  padding-top: 15px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 250px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
`
interface IAreaProps{
    isDraggingOver : boolean,
    isDraggingFromThisWith: boolean
}
export const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver? props.theme.boardDraggingToColor : props.isDraggingFromThisWith? props.theme.boardDraggingFromColor : props.theme.boardContentColor};
    flex-grow: 1;
    padding: 10px 15px;
    transition: background-color 0.3s ease-in-out;
`
const TaskForm = styled.form`
    width: 100%;
    input{
        width : 100%;
        height: 100%;
        padding: 4px;
        text-align: center;
        border: 0px;
        border-radius: 5px;
    };
`;
interface IBoardProps {
    boardData : IBoard;
    index : number;
}
interface IForm {
    toDo : string;
}
function Board({boardData, index} : IBoardProps){
    const { register, setValue, handleSubmit} = useForm<IForm>();
    const [boards, setBoards] = useRecoilState(boardState);
    const { 
            boardId,
            title : boardTitle,
            content : toDos,
        } = boardData;
    const onTaskFormValid = ({toDo} : IForm) => {
        const newToDos = {
            id : Date.now(),
            text : toDo
        }
        setBoards(prev => {
            const nextState = prev.map(board => 
                board.boardId === boardId
                ? {
                    ...board,
                    content : [
                        ...board.content,
                        newToDos
                    ]
                } 
                : board
            )
            return nextState
            
        })
        setValue("toDo", "");
    }
    return <Draggable key={boardId} draggableId={String(boardId)} index={index}>
                {(magic, snapshot) => <Wrapper isDragging={snapshot.isDragging} ref={magic.innerRef }{...magic.dragHandleProps}{...magic.draggableProps}>
                    <BoardTitle boardTitle={boardTitle} boardId={boardId}/>
                    <TaskForm onSubmit={handleSubmit(onTaskFormValid)}>
                        <input
                        {...register("toDo", {required : true})}
                        type='text'
                        placeholder={boards[index].title ? `Add Task On ${boards[index].title}` : "Name this board"}></input>
                    </TaskForm>
                    <Droppable type={droppableTypes.CARD} droppableId={String(boardId)}>{(magic, snapshot) => 
                        <Area 
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                        ref={magic.innerRef}
                        {...magic.droppableProps}>
                            {toDos.map((todo, index) => 
                                <DraggableCard key={todo.id} boardId={boardId}toDoText={todo.text} toDoId={todo.id} index={index}/>
                            )}
                        {magic.placeholder}
                        </Area>
                    }
                    </Droppable>
                </Wrapper>}
            </Draggable>
}

export default Board