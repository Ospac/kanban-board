import { useRecoilState } from 'recoil';
import styled from 'styled-components'
import { toDoState } from '../atoms';
const Wrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: bold;
  color: ${prop => prop.theme.cardColor};
`
function DeleteBoard(){
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onClick = () => {
   
    }
    return <Wrapper onClick={onClick}>
        +
    </Wrapper>
}

export default DeleteBoard