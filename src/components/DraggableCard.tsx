import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import React from 'react';

const Card = styled.div<{isDragging : boolean}>`
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 6px;
  font-size: 13px;
  background-color: ${props=> props.isDragging? props.theme.draggingCardColor : props.theme.cardColor};
  box-shadow: ${props=> props.isDragging? "2px 0px 5px rgba(0,0,0,0.5)" : "none"};
  
`
interface IDraggableCard{
    toDoText : string,
    toDoId : number,
    index : number,
}
function DraggableCard({toDoText, toDoId, index} : IDraggableCard) {
    return <Draggable key={toDoId} draggableId={String(toDoId)} index={index}>
        {(magic, snapshot) => 
        <Card isDragging={snapshot.isDragging} ref={magic.innerRef }
        {...magic.draggableProps} {...magic.dragHandleProps}>
            {toDoText}
        </Card>}
    </Draggable>
    
}

export default React.memo(DraggableCard);