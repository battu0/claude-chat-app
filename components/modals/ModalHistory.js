import React, { useState } from 'react'
import SharedModal from './SharedModal'
import { View, Text, StyleSheet } from 'react-native'
import { Searchbar, List, Avatar } from 'react-native-paper'

const ModalHistory = ({ visible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <SharedModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        {/* subheader: date, title: chat name, description: beginning text of chat */}
        <View style={styles.list}>
          <List.Section>
            <List.Subheader>Some title</List.Subheader>
            <List.Item
              title="First Item"
              description="First item description"
              left={() => (
                <Avatar.Image
                  size={24}
                  source={require('../../assets/personality-assets/Spark_img.png')}
                />
              )}
            />
            <List.Item
              title="Second Item"
              description="Second item description"
              left={() => (
                <Avatar.Image
                  size={24}
                  source={require('../../assets/personality-assets/Sage_img.png')}
                />
              )}
            />
          </List.Section>
        </View>
      </View>
    </SharedModal>
  )
}

const styles = StyleSheet.create({
  container: {},
  list: {},
})

export default ModalHistory
