import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { IconButton, Searchbar, Text, useTheme } from 'react-native-paper'

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'Hi there' },
    { role: 'assistant', content: 'Hi there' },
  ])
  const [input, setInput] = useState('')

  const theme = useTheme()

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <View
        style={[
          styles.messageBubble,
          item.role === 'user'
            ? [
                styles.userMessageBubble,
                {
                  backgroundColor: theme.colors.surfaceContainerHigh,
                },
              ]
            : [
                styles.assistantMessageBubble,
                {
                  backgroundColor: theme.colors.secondary,
                },
              ],
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.role === 'user'
              ? { color: theme.colors.onSurfaceVariant }
              : { color: theme.colors.onSecondary },
          ]}
          variant="bodyMedium"
        >
          {item.content}
        </Text>
      </View>
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
      />

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: theme.colors.surfaceContainer },
        ]}
      >
        <Searchbar
          placeholder="Type your message"
          icon={'format-letter-case'}
          value={input}
          onChangeText={setInput}
          style={{
            flex: 1,
            backgroundColor: theme.colors.surfaceDim,
            color: theme.colors.onSurface,
          }}
          right={() => (
            <IconButton
              icon="send"
              size={24}
              iconColor={theme.colors.onSurfaceVariant}
              onPress={() => console.log('Sending message...')}
            />
          )}
          multiline
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  userMessageBubble: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    borderBottomRightRadius: 8,
  },
  assistantMessageBubble: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    borderBottomLeftRadius: 8,
  },
  messageText: {
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
  },
})

export default Chat
