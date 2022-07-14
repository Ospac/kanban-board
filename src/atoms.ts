import { atom} from "recoil";
export interface IToDo{
    text : string,
    id : number,
}
export interface IToDoState{
    [key : string] : IToDo[]
}
interface IBoardState{
    [id : string] : string
}
export const boardState = atom<IBoardState>({
    key : "boards",
    default: {
        1 : 'to do', // id : title
        2 : 'done',
        3 : 'doing',
    }
})
export const toDoState = atom<IToDoState>({
    key: "toDos",
    default: {
        1 :[], // boardId : IToDo[]
        2 :[],
        3 :[],
    },
})
