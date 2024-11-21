import DrawerNavigation from './DrawerNavigation'
import { NavigationContainer } from '@react-navigation/native'

const RootNavigator = ({ theme }) => {
  return (
    <NavigationContainer theme={theme}>
      <DrawerNavigation />
    </NavigationContainer>
  )
}

export default RootNavigator
