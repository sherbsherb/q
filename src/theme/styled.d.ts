// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius?: string
    colors: {
      grey: string
      red: string
    }
    menu: {
      width: number
      paddingTop: number
      paddingBottom: number
    }
  }
}
