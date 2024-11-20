import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import { IconButton } from 'react-native-paper'

// TO-DO:
// 1. Change color styles
// background, userMessageBubble/assistantMessageBubble bg, messageText, textInput container bg/bar bg
// textInput color
// 2. Style message bubbles
// 3. Remove header

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'Hi there' },
    { role: 'assistant', content: 'Hi there' },
  ])
  const [input, setInput] = useState('')

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <View
        style={[
          styles.messageBubble,
          item.role === 'user'
            ? styles.userMessageBubble
            : styles.assistantMessageBubble,
        ]}
      >
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.inputContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message"
            multiline
          />
        </View>
        <IconButton icon="send" size={24} style={styles.sendButton} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
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
    backgroundColor: '#212121',
  },
  assistantMessageBubble: {
    backgroundColor: '#0D0D0D',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    flexWrap: 'wrap',
    color: '#fff',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  textInputContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#2F2F2F',
    borderRadius: 16,
    minHeight: 40,
    backgroundColor: '#242424',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  textInput: {
    color: '#fff',
    fontSize: 16,
  },
  sendButton: {
    alignSelf: 'flex-end',
  },
})

export default Chat
