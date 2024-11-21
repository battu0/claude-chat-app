import './gesture-handler.native'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Onboarding from './screens/Onboarding'
import RootNavigator from './navigation/RootNavigator'
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native'
// import MaterialTheme from './material-theme.json'
import { MaterialThemeDark, MaterialThemeLight } from './utils/theme'

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
})

const CombinedDefaultTheme = {
  ...MaterialThemeLight,
  ...LightTheme,
  colors: {
    ...MaterialThemeLight.colors,
    ...LightTheme.colors,
  },
  fonts: configureFonts(),
}

const CombinedDarkTheme = {
  ...MaterialThemeDark,
  ...DarkTheme,
  colors: {
    ...MaterialThemeDark.colors,
    ...DarkTheme.colors,
  },
  fonts: configureFonts(),
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [viewedOnboarding, setViewedOnboarding] = useState(false)

  // console.log('Material Theme: ', CombinedDarkTheme.colors.surfaceContainer)
  // console.log('Navigation Light Theme: ', LightTheme)

  const Loading = () => {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('viewed-onboarding')

      if (value !== null) {
        setViewedOnboarding(true)
      }
    } catch (e) {
      console.log('Error @check_onboarding: ', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkOnboarding()
  }, [])

  const handleSetViewedOnboarding = async () => {
    setViewedOnboarding(true)
    await AsyncStorage.setItem('viewed-onboarding', 'true')
  }

  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      {loading ? (
        <Loading />
      ) : viewedOnboarding ? (
        <RootNavigator theme={CombinedDefaultTheme} />
      ) : (
        <Onboarding onSetViewedOnboarding={handleSetViewedOnboarding} />
      )}
    </PaperProvider>
  )
}
