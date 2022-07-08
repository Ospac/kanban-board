import { atom } from "recoil";
export interface IToDo{
    text : string,
    id : number,
}
export interface IToDoState{
    [key : string] : IToDo[]
}
export const toDoState = atom<IToDoState>({
    key: "toDos",
    default: {
        "to do" :[ {text : "abc", id : 1}],
        "doing" :[ {text : "ab", id : 2}]
    },
})