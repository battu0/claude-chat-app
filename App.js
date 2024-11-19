import './gesture-handler.native'
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Onboarding from './components/Onboarding'
import DrawerNavigation from './navigation/DrawerNavigation'
import theme from './utils/theme'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [viewedOnboarding, setViewedOnboarding] = useState(false)

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
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {loading ? (
          <Loading />
        ) : viewedOnboarding ? (
          <DrawerNavigation />
        ) : (
          <Onboarding onSetViewedOnboarding={handleSetViewedOnboarding} />
        )}
      </NavigationContainer>
    </PaperProvider>
  )
}
