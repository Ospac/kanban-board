import {Droppable} from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { boardState, IToDo, toDoState } from '../atoms';
import { BoardTitle } from './BoardTitle';
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
    toDos : IToDo[];
    boardId: string;
}
interface IForm {
    toDo : string;
}
function Board({toDos, boardId} : IBoardProps){
    const { register, setValue, handleSubmit} = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const boards = useRecoilValue(boardState);
    const onTaskFormValid = ({toDo} : IForm) => {
        const newToDos = {
            id : Date.now(),
            text : toDo
        }
        setToDos(prev => {
            return {
                ...prev,
                [boardId] : [...prev[boardId], newToDos]
            }
        })
        setValue("toDo", "");
    }
    return <Wrapper>
            <BoardTitle boardId={boardId}></BoardTitle>
            <TaskForm onSubmit={handleSubmit(onTaskFormValid)}>
                <input
                {...register("toDo", {required : true})}
                type='text'
                placeholder={boards[boardId] ? `Add Task On ${boards[boardId]}` : "Name this board"}></input>
            </TaskForm>
            <Droppable droppableId={boardId}>{(magic, snapshot) => 
                <Area 
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}>
                    {toDos.map((todo, index) => 
                        <DraggableCard key={todo.id} toDoText={todo.text} toDoId={todo.id} index={index}/>
                    )}
                {magic.placeholder}
                </Area>
            }
        </Droppable>
      </Wrapper>
}

export default Board