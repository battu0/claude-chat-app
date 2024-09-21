import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Message from '../components/Message'
import AppbarBottom from '../components/AppbarBottom'
import AppbarHeader from '../components/AppbarHeader'
import theme from '../utils/theme'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
})

const Chat = ({ onOpenModalHistory }) => {
  // data: [{date, avatar, title, description, messages}]
  const [data, setData] = useState([])

  const [messages, setMessages] = useState([])

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Message item={item} />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <AppbarHeader onOpenModalHistory={onOpenModalHistory} />
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageList}
      />
      <AppbarBottom
        messages={messages}
        setMessages={setMessages}
        apiClient={anthropic}
      />
      <StatusBar style="auto" translucent={true} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
})

export default Chat
