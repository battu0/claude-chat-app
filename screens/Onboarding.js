import React, { useState, useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Button } from 'react-native-paper'
import OnboardingItem from '../components/onboarding/OnboardingItem'
import Paginator from '../components/onboarding/Paginator'
import slides from '../slides'

const Onboarding = ({ onSetViewedOnboarding }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slidesRef = useRef(null)

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const handleScroll = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
    } else {
      try {
        onSetViewedOnboarding()
      } catch (e) {
        console.log('Error set @viewed_onboarding: ', e)
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} currentIndex={currentIndex} />
      <Button mode="contained" onPress={handleScroll}>
        {currentIndex !== slides.length - 1 ? 'Continue' : 'Get started'}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Onboarding
