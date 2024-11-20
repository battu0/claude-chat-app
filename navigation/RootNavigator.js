import DrawerNavigation from './DrawerNavigation'
import { NavigationContainer } from '@react-navigation/native'

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  )
}

export default RootNavigator
