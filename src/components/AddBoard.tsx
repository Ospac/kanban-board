import { Draggable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components'
import { boardState, boardTypes } from '../atoms';
const Wrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 250px;
  min-width: 233px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: bold;
  color: ${prop => prop.theme.cardColor};
`
interface AddBoardProps{
    index : number
}
function AddBoard({index} : AddBoardProps){
    const [boards, setBoards] = useRecoilState(boardState);
    const onClick = () => {
        setBoards(prev => {
            const newState = [
                ...prev,
                {
                    boardId: Date.now(),
                    boardType: boardTypes.BOARD,
                    title: '',
                    content: [
                    ]
                }
            ]
            return newState;
        })
    }
    return <Draggable key={index} draggableId={String(index)} index={index}>
         {(magic, snapshot) =>
            <Wrapper onClick={onClick} ref={magic.innerRef }{...magic.dragHandleProps}{...magic.draggableProps}>
                +
            </Wrapper>
        }
    </Draggable>
}

export default AddBoard