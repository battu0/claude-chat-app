import React, { useState } from 'react'
import { PaperProvider } from 'react-native-paper'
import theme from './utils/theme'
import Chat from './screens/Chat'
import Onboarding from './components/Onboarding'
import SelectPersonality from './components/SelectPersonality'
import ModalHistory from './components/modals/ModalHistory'

export default function App() {
  const [modalHistoryVisible, setModalHistoryVisible] = useState(false)

  const handleOpenModalHistory = () => {
    setModalHistoryVisible(true)
  }

  return (
    <PaperProvider theme={theme}>
      {/* <Onboarding /> */}
      {/* <SelectPersonality /> */}
      <Chat onOpenModalHistory={handleOpenModalHistory} />
      <ModalHistory
        visible={modalHistoryVisible}
        onClose={() => setModalHistoryVisible(false)}
      />
    </PaperProvider>
  )
}
