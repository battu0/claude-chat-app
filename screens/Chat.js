import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Message from '../components/Message'
import AppbarBottom from '../components/AppbarBottom'
import AppbarHeader from '../components/AppbarHeader'
import theme from '../utils/theme'
import Anthropic from '@anthropic-ai/sdk'
import AsyncStorage from '@react-native-async-storage/async-storage'

// const anthropic = new Anthropic({
//   apiKey: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
// })

const STORAGE_KEY = '@chat_data'

const Chat = ({ onOpenModalHistory }) => {
  // data: [{id, date, avatar, title, description, messages}]
  // Create, Replace, Update, Delete
  const [data, setData] = useState([])

  const [messages, setMessages] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY)
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
      }
    } catch (error) {
      console.log('Error loading data: ', error)
    }
  }

  // useEffect(() => {
  //   initChat()
  // }, [])

  // const initChat = async () => {
  //   const newChat = {
  //     id: uuidv4(),
  //     date: new Date(),
  //     avatar: 'avatar',
  //     title: 'title',
  //     description: 'description',
  //     messages: [], // display messages
  //   }
  //   setData(newChat)
  // }

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
