// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
      bgColor: string,
      textColor : string,
      cardColor : string,
      draggingCardColor : string,
      boardColor: string,
      boardDraggingFromColor : string,
      boardDraggingToColor : string,
      boardContentColor : string,
    }
}