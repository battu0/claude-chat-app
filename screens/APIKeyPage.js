import React, { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Text, TextInput, Button, Snackbar } from 'react-native-paper'
import { useApiKeyContext } from '../context/ApiKeyContext'
import * as WebBrowser from 'expo-web-browser'

export default function APIKeyPage() {
  const { apiKey, setApiKey } = useApiKeyContext()
  const [apiKeyInput, setApiKeyInput] = useState(apiKey)

  const [snackbarVisible, setSnackbarVisible] = useState(false)

  const handleOpenApiKeysPage = () => {
    WebBrowser.openBrowserAsync('https://console.anthropic.com/settings/keys')
  }

  const saveApiKey = async () => {
    if (apiKeyInput.trim().length > 0) {
      setApiKey(apiKeyInput)
      setSnackbarVisible(true)
    } else {
      Alert.alert('Error', 'Please enter a valid API key')
    }
  }

  const removeApiKey = async () => {
    setApiKey('')
    setApiKeyInput('')
    setSnackbarVisible(true)
  }

  const handlePress = () => {
    if (apiKey) {
      removeApiKey()
    } else {
      saveApiKey()
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="bodyMedium">
        To connect with AI, add an API key. You can obtain an API key from{' '}
        <Text variant="labelMedium" onPress={handleOpenApiKeysPage}>
          https://console.anthropic.com/settings/keys
        </Text>
      </Text>
      <TextInput
        mode="outlined"
        value={apiKeyInput}
        onChangeText={setApiKeyInput}
        placeholder="Enter your API key"
        autoCorrect={false}
      />
      <Button mode="contained" onPress={handlePress}>
        {apiKey ? 'Remove' : 'Save'}
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'close',
        }}
      >
        {apiKey ? 'API key saved.' : 'API key removed.'}
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 32,
    paddingHorizontal: 16,
    rowGap: 16,
    // alignItems: 'center',
  },
})
