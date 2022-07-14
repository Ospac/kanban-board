import { useForm } from "react-hook-form";
import { useRecoilState} from "recoil";
import styled from 'styled-components';
import { boardState} from "../atoms";

const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;
`
const TitleForm = styled.form`
    input{
        background-color: ${props => props.theme.boardColor};
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        border: 0px;
    }
`;
interface IForm{
    newTitle : string
}
interface IBoardTitleProps{
    boardId: string;
}
export function BoardTitle({boardId} : IBoardTitleProps){
    const [boards, setBoards] = useRecoilState(boardState);
    const onValid = ({newTitle} : IForm) =>{
        setBoards(board => {
            return {
                ...board,
                [boardId] : newTitle
            }
        })
    }
    const { register,handleSubmit} = useForm<IForm>({
        defaultValues: {
            newTitle : boards[boardId]
        }
    });
    console.log(boards);
    return <TitleForm onSubmit={handleSubmit(onValid)}>
        <input 
        {...register("newTitle", {required : true})}
        placeholder="type title"
        type='text'
        >
        </input>
    </TitleForm>
}