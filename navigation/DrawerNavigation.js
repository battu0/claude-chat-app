import { View, StyleSheet, useWindowDimensions } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen'
import ChatScreen from '../screens/ChatScreen'
import { Icon } from 'react-native-paper'
import APIKeyPage from '../screens/APIKeyPage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Updates from 'expo-updates'

const Drawer = createDrawerNavigator()

// TO-DO:
// - Add drawer item to drawer's footer that reset the viewed-onboarding value
// - Can app be reloaded when user presses on a drawer item?

function CustomDrawerContent(props) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Home"
          labelStyle={styles.drawerItemLabel}
          icon={() => <Icon source="home" size={24} />}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label="Chat"
          labelStyle={styles.drawerItemLabel}
          icon={() => <Icon source="chat" size={24} />}
          onPress={() => props.navigation.navigate('Chat')}
        />
      </DrawerContentScrollView>

      <View style={styles.footerContainer}>
        <DrawerItem
          label="Reload App"
          labelStyle={styles.drawerItemLabel}
          icon={() => <Icon source="reload" size={24} />}
          // onPress={() => props.navigation.navigate('Chat')}
          onPress={async () => {
            await AsyncStorage.removeItem('viewed-onboarding')
            await Updates.reloadAsync()
          }}
        />
        <DrawerItem
          label="API Key"
          labelStyle={styles.drawerItemLabel}
          icon={() => <Icon source="key" size={24} />}
          // onPress={() => props.navigation.navigate('Chat')}
          onPress={() => console.log('navigate to API key page')}
        />
        <DrawerItem
          label="Usage"
          labelStyle={styles.drawerItemLabel}
          icon={() => <Icon source="podium" size={24} />}
          // onPress={openUsagePage}
          onPress={() => console.log('navigate to usage page web')}
        />
      </View>
    </View>
  )
}

function DrawerNavigation() {
  const dimensions = useWindowDimensions()
  const isLargeScreen = dimensions.width >= 768

  return (
    <Drawer.Navigator
      initialRouteName="Chat"
      drawerContent={CustomDrawerContent}
      screenOptions={{
        // headerTintColor: '#fff',
        drawerType: isLargeScreen ? 'permanent' : 'front',
        // Header left's default icon is menu
        // headerLeft:
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen
        name="APIKey"
        component={APIKeyPage}
        options={{ headerTitle: 'API Key' }}
      />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  drawerItemLabel: {
    // color: '#fff',
  },
  footerContainer: {
    borderTopColor: '#ffffff33',
    borderTopWidth: 1,
    marginBottom: 20,
    paddingTop: 10,
  },
})

export default DrawerNavigation
