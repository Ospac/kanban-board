import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import React from 'react';
import { RiDeleteBackFill } from "react-icons/ri";
import { boardState } from '../atoms';
import { useRecoilState } from 'recoil';

const Card = styled.div<{isDragging : boolean}>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2px 10px;
    border-radius: 5px;
    margin-bottom: 8px;
    font-size: 12px;
    flex-wrap: wrap;
    background-color: ${props=> props.isDragging? props.theme.draggingCardColor : props.theme.cardColor};
    box-shadow: ${props=> props.isDragging? "2px 0px 5px rgba(0,0,0,0.5)" : "none"};
    &:hover{
        button{
            opacity: 1;
        }
    };  
    button{
        opacity: 0;
        padding-top: 2px;
        font-size: 25px;
        background-color: inherit;
        color: ${props => props.theme.boardColor};
        border: 0;
        transition: all 0.2s;

        &:hover{
            color: ${props => props.theme.bgColor};
        };
    };
`
const ToDoText = styled.p`
    width: 70%;
    word-break: break-all;
    word-wrap: break-word;
`;
interface IDraggableCard{
    toDoText : string,
    toDoId : number,
    index : number,
    boardId: number,
}

function DraggableCard({toDoText, toDoId, index, boardId} : IDraggableCard) {
    const [boards, setBoards] = useRecoilState(boardState);
    const onDeleteCard = () => {
        setBoards( prev => {
            const newState = boards.map( board =>{
                return {
                  ...board,
                  content: [
                    ...board.content
                  ]}})
            const sourceBoardIdx = newState.findIndex(({boardId : id}) => id === boardId);
            newState[sourceBoardIdx].content.splice(index, 1);
            return newState;
        })
    }
    return <Draggable key={toDoId} draggableId={String(toDoId)} index={index}>
        {(magic, snapshot) => 
        <Card isDragging={snapshot.isDragging} ref={magic.innerRef }
        {...magic.draggableProps} {...magic.dragHandleProps}>
            <ToDoText>{toDoText.length > 19? toDoText.slice(0,19) + '...' : toDoText}</ToDoText>
            <button onClick={onDeleteCard}><RiDeleteBackFill/></button>
        </Card>}
    </Draggable>
    
}

export default React.memo(DraggableCard);

