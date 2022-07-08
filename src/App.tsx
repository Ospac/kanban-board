import styled from 'styled-components';
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';
import { createGlobalStyle } from 'styled-components'
import { useRecoilState } from 'recoil';
import { IToDoState, toDoState } from './atoms';
import Board from './components/Board';


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
const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;

`
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 15px;
  grid-template-columns: repeat(3, 1fr);
`


function App() {
  const [toDos, setTodos] = useRecoilState(toDoState);
  const onDragEnd = (info : DropResult) => {
    setTodos((allBoards) => {
      const {destination, source, draggableId} = info;      
      if(!destination) return allBoards;
      const copyToDos : IToDoState = {};
      Object.keys(allBoards).forEach((boardKey) => {
        copyToDos[boardKey] = [...allBoards[boardKey]];
      })
      copyToDos[source.droppableId].splice(source.index, 1);
      copyToDos[destination.droppableId].splice(destination.index, 0, draggableId);
      return copyToDos;
    })
  };
  return (
    <>
      <GlobalStyle/>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map(boardId => <Board key={boardId} boardId={boardId} toDos={toDos[boardId]}/>)}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
