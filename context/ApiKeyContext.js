import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ApiKeyContext = createContext({
  apiKey: '',
  setApiKey: () => {},
})

export const ApiKeyContextProvider = ({ children }) => {
  const [apiKey, setApiKeyState] = useState('')

  useEffect(() => {
    const loadApiKey = async () => {
      const key = await AsyncStorage.getItem('api-key')
      setApiKey(key || '')
    }

    loadApiKey()
  }, [])

  const setApiKey = async (key) => {
    setApiKeyState(key)
    await AsyncStorage.setItem('api-key', key)
  }

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  )
}

// Hook to use the API key context
export const useApiKeyContext = () => {
  const context = useContext(ApiKeyContext)

  return context
}
