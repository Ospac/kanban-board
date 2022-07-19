import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

export enum boardTypes {
    "BOARD" = "BOARD",
    "ADD" = "ADD",
    "DELETE"  = "DELETE",
  }
export interface IToDo{
    text : string,
    id : number,
}
export interface IBoard{
    title : string,
    boardId : number,
    boardType :boardTypes,
    content : IToDo[],
    
}
const { persistAtom } = recoilPersist()
export const boardState = atom<IBoard[]>({
    key : "boards",
    effects_UNSTABLE: [persistAtom],
    default: [
            {
                title : '',
                boardId: 0,
                boardType: boardTypes.ADD,
                content: []
            },
            {
                title : '',
                boardId: 1,
                boardType: boardTypes.DELETE,
                content: []
            },

        // {
        //     title: 'TO_DO',
        //     boardId: 1,
        //     content: [
              
        //     ],
        // },
        // {
        //     title: 'DOING',
        //     boardId: 2,
        //     content: [
               
        //     ],
        // }
        
    ]
})

