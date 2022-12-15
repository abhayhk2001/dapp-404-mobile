import React, { useState, useEffect, useMemo } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PostContext } from "./src/context/PostContext";
import { ContractProvider } from "./src/context/ContractContext";
import { AuthContext } from "./src/context/AuthContext";
import { ThemeProvider } from '@rneui/themed';
import { Icon } from "@rneui/base";
import theme from "./src/static/theme";
import NavigationBar from "./src/components/NavigationBar";


import "./global"
import {
  ConfirmPost, Dashboard, Splash, Login, Maximised, NewPost, Profile, Signup, NewsLang
} from "./src/screens/allScreens";

const AuthStack = createNativeStackNavigator();
const NewPostStack = createNativeStackNavigator();
const DashboardStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{
        title: "Login",
      }}
    />
    <AuthStack.Screen
      name="Sign In"
      component={Signup}
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
  const [postData, setPostData] = useState({})
  return (
    <PostContext.Provider value={{ postData, setPostData }}>
      <NewPostStack.Navigator screenOptions={{
        header: props => <NavigationBar {...props} />,
      }}>
        <NewPostStack.Screen name="NewPost" component={NewPost} />
        <NewPostStack.Screen name="ConfirmPost" component={ConfirmPost} />
        <NewPostStack.Screen name="NewsLang" component={NewsLang} />
      </NewPostStack.Navigator>
    </PostContext.Provider>
  );
}

function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator screenOptions={{
      header: props => <NavigationBar {...props} />,
    }}>
      <DashboardStack.Screen name="Home" component={Dashboard} />
      <DashboardStack.Screen name="Maximised" component={Maximised} />
    </DashboardStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{
      header: props => <NavigationBar {...props} />,
    }}>
      <ProfileStack.Screen name="MyProfile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

function MainTabScreen() {
  return (
    <Tab.Navigator initialRouteName="Dashboard" screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.darkColors.background,
        height: 60,
        marginTop: -20,
        borderWidth: 0,
        borderColor: theme.darkColors.primary,
      }
    }} >
      <Tab.Screen name="NewPostScreen" component={NewPostStackScreen} options={{
        tabBarIcon: (() => {
          return <Icon
            color={theme.darkColors.secondary}
            name="add"
            size={30}
            type="material"
          />
        })
      }} />
      <Tab.Screen name="Dashboard" component={DashboardStackScreen} options={{
        tabBarIcon: (() => {
          return <Icon
            color={theme.darkColors.secondary}
            name="dashboard"
            size={30}
            type="material"
          />
        })
      }} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} options={{
        tabBarIcon: (() => {
          return <Icon
            color={theme.darkColors.secondary}
            name="person"
            size={30}
            type="material"
          />
        })
      }} />
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

  const authContext = useMemo(() => {
    return {
      login: (token) => {
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
    }
  });

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
      < ContractProvider >
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <RootStackScreen userToken={userToken} />
          </NavigationContainer>
        </ThemeProvider>
      </ContractProvider >
    </AuthContext.Provider>
  );
}