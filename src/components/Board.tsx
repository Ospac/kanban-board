import { useRef } from 'react';
import {Droppable} from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
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
const Form = styled.form`
    width: 100%;
    input{
        width : 100%;
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
    const onValid = ({toDo} : IForm) => {
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
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input
                {...register("toDo", {required : true})}
                type='text' 
                placeholder={`Add Task On ${boardId}`}></input>
            </Form>
            <Droppable droppableId={boardId}>{(magic, snapshot) => 
                <Area 
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef }
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