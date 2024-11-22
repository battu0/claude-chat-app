import Anthropic from '@anthropic-ai/sdk'
import React, { useState, useRef } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import { IconButton, Searchbar, Text, useTheme } from 'react-native-paper'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const flatListRef = useRef(null)

  const theme = useTheme()

  const sendMessage = async (message) => {
    // Create a new user message
    const userMessage = {
      role: 'user',
      content: message,
    }

    // Update messages state with the new user message
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)

    // Set loading state to true
    setLoading(true)

    try {
      // Create Anthropic instance
      const anthropic = new Anthropic({
        apiKey: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
      })

      // Get AI's response
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: updatedMessages,
      })

      // Create a new AI message with the response
      const aiMessage = {
        role: 'assistant',
        content: response.content[0].text,
      }

      // Update messages state with the new AI message
      const finalMessages = [...updatedMessages, aiMessage]
      setMessages(finalMessages)
    } catch (error) {
      console.error('Error while sending message: ', error)

      // Create error message
      const errorMessage = {
        role: 'error',
        content: 'An error occurred while processing your request.',
      }

      // Update messages state with the new error message
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (input.trim() === '') return

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)

    // Get message from input state
    const message = input.trim()
    // Clean input state
    setInput('')
    // Send message
    await sendMessage(message)

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }

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

  const renderFooter = () => {
    if (!loading) return null

    return (
      <View style={styles.messageContainer}>
        <View style={[styles.message, styles.loadingBubble]}>
          <ActivityIndicator size={'small'} color={theme.colors.onSurface} />
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
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
              onPress={handleSendMessage}
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
  loadingBubble: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    borderBottomLeftRadius: 8,
    // backgroundColor: theme.colors.surfaceContainerHigh,
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
