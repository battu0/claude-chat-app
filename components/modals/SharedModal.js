import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  PanResponder,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Modal, Portal, Appbar } from 'react-native-paper'
import theme from '../../utils/theme'

const SharedModal = ({ visible, onClose, children }) => {
  const [modalHeight, setModalHeight] = useState('70%')
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height)
        setIsKeyboardVisible(true)
      }
    )
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardHeight(0)
        setIsKeyboardVisible(false)
      }
    )

    return () => {
      keyboardWillShowListener.remove()
      keyboardWillHideListener.remove()
    }
  }, [])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newHeight = Math.max(50, Math.min(100, 70 - gestureState.dy / 5))
        setModalHeight(`${newHeight}%`)
      },
    })
  ).current

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        contentContainerStyle={{
          height: isKeyboardVisible
            ? `${parseInt(modalHeight) + 15}%`
            : modalHeight,
        }}
        // no scrim since on md specs it says standard bottom sheets have no scrim
        // scrim color right?
        theme={{ colors: { backdrop: theme.colors.scrim } }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.sheetHeader} {...panResponder.panHandlers}>
            <View style={styles.dragHandle} />
          </View>
          <Appbar.Header>
            <Appbar.Content title="History" />
            <Appbar.Action icon="close-circle-outline" onPress={onClose} />
          </Appbar.Header>
          <View
            style={[styles.modalContent, { paddingBottom: keyboardHeight }]}
          >
            {children}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  sheetHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    // backgroundColor: 'red',
  },
  dragHandle: {
    width: 32,
    height: 4,
    backgroundColor: theme.colors.onSurfaceVariant,
    opacity: 0.4,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
})

export default SharedModal
