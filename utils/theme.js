import color from 'color'
import { MD3DarkTheme as DefaultTheme } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#D0BCFE',
    primaryFixed: '#EADDFF',
    onSurface: '#E6E0E9',
    surface: '#141218',
    surfaceContainerHighest: '#36343B',
    surfaceContainerHigh: '#2B2930',
    surfaceContainer: '#211F26',
    surfaceContainerLow: '#1D1B20',
    surfaceContainerLowest: '#0F0D13',
    surfaceDim: '#141218',
    outline: '#938F99',
    scrim: color('#000').alpha(0.32).rgb().string(),
  },
}

// primary, on-primary, secondary, on-secondary, surface, surface-container, surface-container-high

export default theme
