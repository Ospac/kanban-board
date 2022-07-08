import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import React from 'react';

const Card = styled.div<{isDragging : boolean}>`
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${props=> props.isDragging? props.theme.draggingCardColor : props.theme.cardColor};
  box-shadow: ${props=> props.isDragging? "2px 0px 5px rgba(0,0,0,0.5)" : "none"};
  
`
interface IDraggableCard{
    todo : string,
    index : number,
}
function DraggableCard({todo, index} : IDraggableCard) {
    // console.log(todo + " is rendered");
    return <Draggable key={todo} draggableId={todo} index={index}>
        {(magic, snapshot) => 
        <Card isDragging={snapshot.isDragging} ref={magic.innerRef }
        {...magic.draggableProps} {...magic.dragHandleProps}>
            {todo}
        </Card>}
    </Draggable>
    
}

export default React.memo(DraggableCard);