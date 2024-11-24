import React from 'react'
import { Appbar } from 'react-native-paper'

const Header = ({ navigation, route }) => {
  const title = route.name

  return (
    <Appbar.Header theme={{}}>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}

export default Header
