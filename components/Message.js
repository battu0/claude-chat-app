import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const Message = ({ item }) => {
  return (
    <View
      style={[
        styles.sendMessageBubble,
        item.role === 'user' ? styles.userBubble : styles.assistantBubble,
      ]}
    >
      <Text
        variant="bodyLarge"
        style={
          item.role === 'user'
            ? styles.userTextColor
            : styles.assistantTextColor
        }
      >
        {item.content}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  sendMessageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  userBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#2B2930',
    borderRadius: 20,
    borderBottomLeftRadius: 8,
  },
  assistantBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#CCC2DC',
    borderRadius: 20,
    borderBottomRightRadius: 8,
  },
  userTextColor: {
    color: '#CAC4D0',
  },
  assistantTextColor: {
    color: '#332D41',
  },
})

export default Message
