// import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  ConfirmPost, Dashboard, Login, Maximised, NewPost, Profile, Signup
} from "./src/screens/allScreens";

const NewPostStack = createNativeStackNavigator();

function NewPostStackScreen() {
  return (
    <NewPostStack.Navigator>
      <NewPostStack.Screen name="New Post" component={NewPost} />
      <NewPostStack.Screen name="ConfirmPost" component={ConfirmPost} />
    </NewPostStack.Navigator>
  );
}

const DashboardStack = createNativeStackNavigator();

function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Home" component={Dashboard} />
      <DashboardStack.Screen name="Maximised" component={Maximised} />
    </DashboardStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="NewPost" component={NewPostStackScreen} />
        <Tab.Screen name="Dashboard" component={DashboardStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}