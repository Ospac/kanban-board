import { useForm } from "react-hook-form";
import { useSetRecoilState} from "recoil";
import styled from 'styled-components';
import { boardState} from "../atoms";
import { RiDeleteBackFill } from "react-icons/ri";
import React from "react";
const Wrapper = styled.div`
    display : flex;
    flex-direction : row;
    align-items: center;
    justify-content: center;

    &:hover{
        button{
            opacity: 1;
        }
    }
    button{
        position: relative;
        left: 5px;
        opacity: 0;
        font-size: 25px;
        background-color: inherit;
        color: ${props => props.theme.draggingCardColor};
        border: 0;
        transition: all 0.2s;
        &:hover{
            color: ${props => props.theme.cardColor};
        }
    }
`
const TitleForm = styled.form`
    width: 80%;
    padding-left: 20px;
    padding-bottom: 5px;
    input{
        width: 100%;
        background-color: ${props => props.theme.boardColor};
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        padding-bottom: 7px;
        border: 0px;
        border-radius: 10px;
        &:focus{
            outline: none;
            box-shadow: 0 0 0 1px #5100ff;
        }
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
    const onDeleteBoard = () =>{
        setBoards(board => {
            const newState = board.filter(board =>
            board.boardId !== boardId
            )
            return newState;
        })
    }
    const { register, handleSubmit } = useForm<IForm>({
        defaultValues: {
            newTitle : boardTitle
        }
    });
    return <Wrapper>
            <TitleForm onSubmit={handleSubmit(onValid) }>
                <input 
                {...register("newTitle", {required : true})}
                placeholder="type title"
                type='text'
                >
                </input>
            </TitleForm>
            <button onClick={onDeleteBoard}><RiDeleteBackFill/></button>
    </Wrapper>
}