import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TodoListScreen } from './src/screens/TodoListScreen';
import FeedScreen from './src/screens/Feed'; // Placeholder, replace with your actual screen
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // This hides the header
          tabBarIcon: ({ focused }) => {
            let iconName;
            let sourceImage;

            if (route.name === 'TodoList') {
              sourceImage = focused
                ? require('./src/Files/ማስታወሻ.png') // Active icon path
                : require('./src/Files/ማስታወሻ.png'); // Inactive icon path
            } else if (route.name === 'Feed') {
              sourceImage = focused
                ? require('./src/Files/ማስታወሻ.png') // Active icon path
                : require('./src/Files/ማስታወሻ.png'); // Inactive icon path
            }

            // You can return any component that you like here!
            return <Image source={sourceImage} style={{ width: 25, height: 25 }} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="TodoList" component={TodoListScreen} options={{ title: 'Todo' }} />
        <Tab.Screen name="Feed" component={FeedScreen} options={{ title: 'Feed' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
