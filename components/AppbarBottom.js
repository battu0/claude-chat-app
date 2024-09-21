import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Icon, IconButton } from 'react-native-paper'
import theme from '../utils/theme'

const AppbarBottom = ({ messages, setMessages, apiClient }) => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (input.trim() === '') return

    const userMessage = { role: 'user', content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await apiClient.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [...messages, userMessage],
      })

      const assistantMessage = {
        role: 'assistant',
        content: response.content[0].text,
      }
      setMessages((prevMessages) => [...prevMessages, assistantMessage])
      console.log('messages: ', messages)
    } catch (error) {
      console.error('Error sending message: ', error)
      const errorMessage = {
        role: 'error',
        content: 'An error occurred while processing your request.',
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    }

    setIsLoading(false)
  }

  return (
    <View style={styles.container}>
      <Icon
        source="plus-circle-outline"
        color={theme.colors.onSurfaceVariant}
        size={24}
      />
      <Icon
        source="emoticon-outline"
        color={theme.colors.onSurfaceVariant}
        size={24}
      />
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message..."
        placeholderTextColor={theme.colors.onSurface}
        onSubmitEditing={sendMessage}
      />
      <IconButton
        icon="send"
        color={theme.colors.onSurfaceVariant}
        size={24}
        onPress={sendMessage}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    columnGap: 16,
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainer,
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 28,
    color: theme.colors.onSurfaceVariant,
    backgroundColor: theme.colors.surfaceDim,
  },
})

export default AppbarBottom
