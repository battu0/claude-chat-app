import * as React from 'react'
import { Appbar, Menu, Divider } from 'react-native-paper'

const AppbarHeader = ({ onOpenModalHistory }) => {
  const [visible, setVisible] = React.useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Chat" />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
          anchorPosition="bottom"
          style={{ marginTop: 20 }}
        >
          <Menu.Item onPress={() => {}} title="Rename" trailingIcon="pencil" />
          <Menu.Item onPress={() => {}} title="Delete" trailingIcon="delete" />
          <Divider />
          <Menu.Item
            onPress={onOpenModalHistory}
            title="History"
            trailingIcon="history"
          />
          <Menu.Item onPress={() => {}} title="Settings" trailingIcon="cog" />
          <Divider />
          <Menu.Item onPress={() => {}} title="New chat" trailingIcon="plus" />
        </Menu>
      </Appbar.Header>
    </>
  )
}

export default AppbarHeader
