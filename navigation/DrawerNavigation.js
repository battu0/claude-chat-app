import { View, StyleSheet, useWindowDimensions } from 'react-native'
import { Icon } from 'react-native-paper'
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import * as Updates from 'expo-updates'
import HomeScreen from '../screens/HomeScreen'
import Chat from '../screens/Chat'
import APIKeyPage from '../screens/APIKeyPage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'

const Drawer = createDrawerNavigator()

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
        drawerType: isLargeScreen ? 'permanent' : 'front',
        header: ({ navigation, route }) => (
          <Header navigation={navigation} route={route} />
        ),
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Chat" component={Chat} />
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
