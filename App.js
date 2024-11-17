import './gesture-handler.native'
import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboarding from './components/Onboarding'
import DrawerNavigator from './navigation/DrawerNavigaton'

const Stack = createNativeStackNavigator()

const getIsSignedIn = () => {
  // logic goes here
  return true
}

export default function App() {
  const isSignedIn = getIsSignedIn()

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <>
          <DrawerNavigator />
        </>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Onboarding" component={Onboarding} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
