import { useForm } from "react-hook-form";
import { useSetRecoilState} from "recoil";
import styled from 'styled-components';
import { boardState} from "../atoms";

const TitleForm = styled.form`
    input{
        background-color: ${props => props.theme.boardColor};
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        padding-bottom: 10px;
        border: 0px;
    }
`;
interface IForm{
    newTitle : string
}
interface IBoardTitleProps{
    boardTitle : string,
    boardId : number
}
export function BoardTitle({boardTitle, boardId} : IBoardTitleProps){
    const setBoards = useSetRecoilState(boardState);
    const onValid = ({newTitle} : IForm) =>{
        setBoards(prev => {
            const newState = prev.map(board => 
                board.boardId === boardId?
                {
                    ...board,
                    title : newTitle
                }
                : board
            )
            return newState
        })
    }
    const { register, handleSubmit } = useForm<IForm>({
        defaultValues: {
            newTitle : boardTitle
        }
    });
    return <TitleForm onSubmit={ handleSubmit(onValid) }>
        <input 
        {...register("newTitle", {required : true})}
        placeholder="type title"
        type='text'
        >
        </input>
    </TitleForm>
}