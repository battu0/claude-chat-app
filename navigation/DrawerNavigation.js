import { View, StyleSheet, useWindowDimensions } from 'react-native'
import {
  Icon,
  Text,
  Switch,
  Drawer as PaperDrawer,
  useTheme,
} from 'react-native-paper'
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
import { PreferencesContext } from '../context/PreferencesContext'
import { useContext } from 'react'

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext)

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <PaperDrawer.Section>
          <PaperDrawer.Item
            label="Chat"
            icon="chat"
            onPress={() => props.navigation.navigate('Chat')}
          />
        </PaperDrawer.Section>
        <PaperDrawer.Section title="Preferences">
          <PaperDrawer.Item
            label="Switch theme"
            right={() => (
              <Switch value={isThemeDark} onValueChange={toggleTheme} />
            )}
          />
          <PaperDrawer.Item
            label="API Key"
            icon={'key'}
            // onPress={() => props.navigation.navigate('Chat')}
            onPress={() => props.navigation.navigate('APIKey')}
          />
          <PaperDrawer.Item
            label="Usage"
            icon={'podium'}
            // onPress={openUsagePage}
            onPress={() => console.log('navigate to usage page web')}
          />
        </PaperDrawer.Section>
      </DrawerContentScrollView>

      <View style={styles.footerContainer}>
        <PaperDrawer.Item
          label="Reload App"
          icon={'reload'}
          // onPress={() => props.navigation.navigate('Chat')}
          onPress={async () => {
            await AsyncStorage.removeItem('viewed-onboarding')
            await Updates.reloadAsync()
          }}
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
  toggleDark: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})

export default DrawerNavigation
