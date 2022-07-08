import { atom } from "recoil";

export interface IToDoState{
    [key : string] : string[]
}
export const toDoState = atom<IToDoState>({
    key: "todos",
    default: {
        "to do" : ["a", "b"],
        doing : ["c", "d", "e"],
        done : ["f", "g"]
    },
})