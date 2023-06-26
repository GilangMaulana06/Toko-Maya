import { View, Text } from 'react-native'
import React from 'react'
import IndexNavigation from './IndexNavigation';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <IndexNavigation />
    </PaperProvider>
  )
}

export default App