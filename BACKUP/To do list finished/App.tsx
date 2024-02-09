import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TodoListScreen } from './src/screens/TodoListScreen'; // Make sure the path matches your file structure

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <TodoListScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Add any styles for the App component here
});

export default App;
