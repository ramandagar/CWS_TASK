import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import AppStack from './navigation/AppStack'
import AuthStack from './navigation/AuthStack'
import store from './src/store.js/store';
import { Provider } from 'react-redux';
const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Provider store={store}>
        {user ? (
         <AppStack/>
        ) : (
         <AuthStack/>
        )}
        </Provider>
    </NavigationContainer>
  );
};

export default App;
