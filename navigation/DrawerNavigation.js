import { useContext } from 'react'
import { View, StyleSheet, useWindowDimensions, Platform } from 'react-native'
import { Switch, Drawer as PaperDrawer } from 'react-native-paper'
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import * as Updates from 'expo-updates'
import HomeScreen from '../screens/HomeScreen'
import Chat from '../screens/Chat'
import APIKeyPage from '../screens/APIKeyPage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'
import { PreferencesContext } from '../context/PreferencesContext'
import * as WebBrowser from 'expo-web-browser'

const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props) => {
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext)

  const handleOpenUsagePage = () => {
    WebBrowser.openBrowserAsync('https://console.anthropic.com/settings/usage')
  }

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
            // On web Switch component doensn't work.
            right={
              Platform.OS !== 'web'
                ? () => (
                    <Switch value={isThemeDark} onValueChange={toggleTheme} />
                  )
                : null
            }
            onPress={toggleTheme}
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
            onPress={handleOpenUsagePage}
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

const DrawerNavigation = () => {
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
