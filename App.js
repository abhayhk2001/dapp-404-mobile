import React, { useState, useEffect, useMemo } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from "./src/context/AuthContext";
import { ThemeProvider, createTheme } from '@rneui/themed';


import {
  ConfirmPost, Dashboard, Splash, Login, Maximised, NewPost, Profile, Signup
} from "./src/screens/allScreens";


const AuthStack = createNativeStackNavigator();
const NewPostStack = createNativeStackNavigator();
const DashboardStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={Login}
      options={{
        title: "Sign In",
        headerStyle: {
          backgroundColor: "#40d1ff",
        },
      }}
    />
  </AuthStack.Navigator>
);

function NewPostStackScreen() {
  return (
    <NewPostStack.Navigator>
      <NewPostStack.Screen name="New Post" component={NewPost} />
      <NewPostStack.Screen name="ConfirmPost" component={ConfirmPost} />
    </NewPostStack.Navigator>
  );
}

function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Home" component={Dashboard} />
      <DashboardStack.Screen name="Maximised" component={Maximised} />
    </DashboardStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

function MainTabScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="NewPost" component={NewPostStackScreen} />
      <Tab.Screen name="Dashboard" component={DashboardStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}


const RootStack = createNativeStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={MainTabScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(false);

  const myTheme = createTheme({
    lightColors: {
      primary: '#f2f2f2',
    },
    darkColors: {
      primary: '#121212',
      secondary: '#3658D7',
      background: '#272547',
      white: '#D1D3DB',
      success: '#0ACDA4',
      error: '#FF6058',
      warning: '#FE9153'
    },
    mode: 'dark',
  });

  const authContext = useMemo(() => {
    return {
      signIn: (token) => {
        setIsLoading(false);
        setUserToken(token);
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("faculty-sudha123");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
      isLoggedIn: () => {
        return true
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <ThemeProvider theme={myTheme}>
        <NavigationContainer>
          <RootStackScreen userToken={userToken} />
        </NavigationContainer>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}