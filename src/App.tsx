import styled from 'styled-components';
import {DragDropContext,  Droppable, DropResult} from 'react-beautiful-dnd';
import { createGlobalStyle } from 'styled-components'
import { useRecoilState } from 'recoil';
import { boardState, boardTypes, IBoard} from './atoms';
import Board from './components/Board';
import AddBoard from './components/AddBoard';


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;700&display=swap');
  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  *{
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    line-height: 1;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q { 
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`

const Title = styled.div`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
  padding : 10px 0;
  background-color: ${props => props.theme.boardColor};
  color: ${props => props.theme.cardColor};
  text-align: center;
  
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 680px;
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  /* align-items: center; */
  overflow: auto;
  white-space: nowrap;

`
const Boards = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
  overflow-x: auto;
`

export enum droppableTypes {
  "BOARD" = "BOARD",
  "CARD" = "CARD",
  "DELETE"  = "DELETE",
}
function App() {
  const [boards, setBoards] = useRecoilState(boardState);
  const onDragEnd = (info : DropResult) => {
    const {destination, source, type} = info;
    console.log(info);
    setBoards((boards) => {       
      if(!destination) return boards;
      if(type === droppableTypes.BOARD){
        const newState = [...boards];
        const destBoard = newState[source.index];
        newState.splice(source.index, 1);
        newState.splice(destination.index, 0, destBoard);
        return newState;
      }
      else if(type === droppableTypes.CARD){
        const newState = boards.map( board =>{
            return {
              ...board,
              content: [
                ...board.content
              ]}})
        const sourceBoardIdx = newState.findIndex(({boardId}) => String(boardId) === source.droppableId);
        const destBoardIdx = newState.findIndex(({boardId}) => String(boardId) === destination.droppableId);
        const splicedObject = newState[sourceBoardIdx].content.splice(source.index, 1);
        newState[destBoardIdx].content.splice(destination.index, 0, splicedObject[0]);
        return newState;
      }
      return boards
    })
    
  };
  return (
    <>
      <GlobalStyle/>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Title>/* 👾what's wrong today?👾 */</Title>
          <Droppable type={droppableTypes.BOARD} droppableId={"boardMain"} direction='horizontal'>
          {(magic, snapshot) => 
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
            {boards.map((board, index) => {
              return board.boardType ===  boardTypes.BOARD?
              <Board key={index} boardData={board} index={index}/>
              :
              board.boardType ===  boardTypes.ADD?
              <AddBoard key={index} index={index}/>
              :
              null
            })}
            {magic.placeholder}
          </Boards>
          }
          </Droppable>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
