import React from 'react'
import { Appbar, Icon } from 'react-native-paper'

const Header = ({ navigation, route }) => {
  const title = route.name

  return (
    <Appbar.Header theme={{}}>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title={'Chat'} />
    </Appbar.Header>
  )
}

export default Header
