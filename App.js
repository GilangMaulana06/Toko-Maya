import { View, Text } from 'react-native'
import React from 'react'
import IndexNavigation from './IndexNavigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { ContextProvider } from './src/context/Context';

const App = () => {
  return (
    <PaperProvider>
      <ContextProvider>
        <IndexNavigation />
      </ContextProvider>
    </PaperProvider>
  )
}

export default App