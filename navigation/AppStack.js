import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './screens/Dashboard';
 

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen options={{
        headerShown:false
      }} name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
  )
}

export default AppStack