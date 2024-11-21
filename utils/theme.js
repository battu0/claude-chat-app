// import color from 'color'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'
import MaterialTheme from '../material-theme.json'

// Add elevation from "https://github.com/callstack/react-native-paper/blob/main/src/styles/themes/v3/LightTheme.tsx"
// because Material Theme Builder doesn't include it.
export const MaterialThemeLight = {
  ...MD3LightTheme,
  colors: {
    ...MaterialTheme.schemes.light,
    elevation: MD3LightTheme.colors.elevation,
  },
}

export const MaterialThemeDark = {
  ...MD3DarkTheme,
  colors: {
    ...MaterialTheme.schemes.dark,
    elevation: MD3DarkTheme.colors.elevation,
  },
}
