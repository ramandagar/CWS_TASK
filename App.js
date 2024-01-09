import * as React from 'react';
import { Text, View ,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvoiceScreen from './src/Screens/Invoice';
import NewInvoiceScreen from './src/Screens/NewInvoiceScreen';
import ShowInvoice from './src/Screens/ShowInvoice';
import store from './src/store/store';
import { Provider } from 'react-redux';
import { selectInvoices } from './src/store/Slices/invoicesSlice';
import FeedScreen from './src/Screens/FeedScreen';
import Search from './src/Screens/Search';


function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

function Invoices() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const InvoiceStack = createNativeStackNavigator();
const InvoiceStackScreen = () => {
  return (
    <InvoiceStack.Navigator>
      <InvoiceStack.Screen options={{ headerShown: false }} name='Invoice' component={InvoiceScreen} />
      <InvoiceStack.Screen options={{}} name='NewInvoiceScreen' component={NewInvoiceScreen} />
      <InvoiceStack.Screen options={{}} name='ShowInvoice' component={ShowInvoice} />
      <InvoiceStack.Screen options={{}} name='Search' component={Search} />
    </InvoiceStack.Navigator>
  );
}
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor:'orange',
        tabBarIconStyle:{
          borderRadius:20,
          fontSize:100,
        },
        tabBarStyle:{
          marginTop:10,
          paddingHorizontal:20
        },
        tabBarItemStyle:{
          borderRadius:50,
          padding:20
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('./assests/dashboard.png')} style={{ width: 20, height: 20 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Invoices"
        component={InvoiceStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('./assests/payment.png')} style={{ width: 20, height: 20 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('./assests/settings.png')} style={{ width: 20, height: 20 }} />
          ),
        }}
      />
       <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('./assests/settings.png')} style={{ width: 20, height: 20 }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}

// // // App.js
// import * as React from 'react';
// import { useState,useEffect } from 'react';
// import { Text, View ,Image,TextInput,Button,TouchableOpacity} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import InvoiceScreen from './src/Screens/Invoice';
// import NewInvoiceScreen from './src/Screens/NewInvoiceScreen';
// import ShowInvoice from './src/Screens/ShowInvoice';
// import store from './src/store/store';
// import { Provider } from 'react-redux';
// import { selectInvoices } from './src/store/Slices/invoicesSlice';
 
// import auth  from '@react-native-firebase/auth';


// // Screens
// import FeedScreen from './src/Screens/FeedScreen';
// import Search from './src/Screens/Search';

// // Register and Login Screens
// const RegisterScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     try {
//       await auth().createUserWithEmailAndPassword(email, password);
//       // Navigate to MyTabs after successful registration
//       navigation.navigate('InvoiceScreen');
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <View>
//       <Text>Register</Text>
//       <TextInput
//         placeholder="Email"
//         onChangeText={(text) => setEmail(text)}
//         value={email}
//       />
//       <TextInput
//         placeholder="Password"
//         onChangeText={(text) => setPassword(text)}
//         value={password}
//         secureTextEntry
//       />
//       <Button title="Register" onPress={handleRegister} />
//     </View>
//   );
// };

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       await auth().signInWithEmailAndPassword(email, password);
//       // Navigate to MyTabs after successful login
      
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <View>
//       <Text>Login</Text>
//       <TextInput
//         placeholder="Email"
//         onChangeText={(text) => setEmail(text)}
//         value={email}
//       />
//       <TextInput
//         placeholder="Password"
//         onChangeText={(text) => setPassword(text)}
//         value={password}
//         secureTextEntry
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// // Main App Navigation
// const Tab = createBottomTabNavigator();
// const InvoiceStack = createNativeStackNavigator();

// const InvoiceStackScreen = () => {
//   return (
//     <InvoiceStack.Navigator>
//        <InvoiceStack.Screen options={{ headerShown: false }} name='Invoice' component={InvoiceStackScreen} />
//        <InvoiceStack.Screen options={{}} name='NewInvoiceScreen' component={NewInvoiceScreen} />
//        <InvoiceStack.Screen options={{}} name='ShowInvoice' component={ShowInvoice} />
//        <InvoiceStack.Screen options={{}} name='Search' component={Search} />
//      </InvoiceStack.Navigator>
//   );
// };

// function Profile(){
//   return(
//     <View>
//       <Text>Profile</Text>
//     </View>
//   )
// }

// function MyTabsScreen() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Feed"
//       screenOptions={{
//         tabBarActiveTintColor: '#e91e63',
//         tabBarShowLabel: false,
//         tabBarActiveBackgroundColor:'orange',
//         tabBarIconStyle:{
//           borderRadius:20,
//           fontSize:100,
//         },
//         tabBarStyle:{
//           marginTop:10,
//           paddingHorizontal:20
//         },
//         tabBarItemStyle:{
//           borderRadius:50,
//           padding:20
//         }
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={FeedScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Image source={require('./assests/dashboard.png')} style={{ width: 20, height: 20 }} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Invoices"
//         component={InvoiceStackScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Image source={require('./assests/payment.png')} style={{ width: 20, height: 20 }} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={Profile}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Image source={require('./assests/settings.png')} style={{ width: 20, height: 20 }} />
//           ),
//         }}
//       />
//        <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Image source={require('./assests/settings.png')} style={{ width: 20, height: 20 }} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// const AuthStack = createNativeStackNavigator();

// const AuthStackScreen = () => {
//   return (
//     <AuthStack.Navigator>
//       <AuthStack.Screen name="Register" component={RegisterScreen} />
//       <AuthStack.Screen name="Login" component={LoginScreen} />
//     </AuthStack.Navigator>
//   );
// };

// export default function App() {
//   const [initializing, setInitializing] = useState(true);

//   const onAuthStateChanged = (user) => {
//     if (initializing) setInitializing(false);
//   };

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return () => subscriber();
//   }, []);

//   if (initializing) return null;

//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         {auth().currentUser ? (
//           <MyTabsScreen />
//         ) : (
//           <AuthStackScreen />
//         )}
//       </NavigationContainer>
//     </Provider>
//   );
// }

 