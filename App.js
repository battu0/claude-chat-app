import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { View, ActivityIndicator } from 'react-native'
import {
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
import { MaterialThemeDark, MaterialThemeLight } from './utils/theme'
import { PreferencesContext } from './context/PreferencesContext'
import { ApiKeyContextProvider } from './context/ApiKeyContext'

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
  const [isThemeDark, setIsThemeDark] = useState(false)

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark)
  }, [isThemeDark])

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  )

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
    <ApiKeyContextProvider>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          {loading ? (
            <Loading />
          ) : viewedOnboarding ? (
            <RootNavigator theme={theme} />
          ) : (
            <Onboarding onSetViewedOnboarding={handleSetViewedOnboarding} />
          )}
        </PaperProvider>
      </PreferencesContext.Provider>
    </ApiKeyContextProvider>
  )
}
