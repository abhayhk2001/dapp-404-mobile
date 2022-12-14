import React, { useState, useEffect, useMemo } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from "./src/context/AuthContext";
import { ThemeProvider, createTheme } from '@rneui/themed';
import { Icon } from "@rneui/base";
import theme from "./src/static/theme";
import NavigationBar from "./src/components/NavigationBar";



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
  return (
    <NewPostStack.Navigator>
      <NewPostStack.Screen name="NewPost" component={NewPost} />
      <NewPostStack.Screen name="ConfirmPost" component={ConfirmPost} />
    </NewPostStack.Navigator>
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
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

function MainTabScreen() {
  return (
    <Tab.Navigator initialRouteName="Dashboard" screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.darkColors.primary,
        height: 60,
        marginTop: -25,
        borderColor: theme.darkColors.primary
      }
    }} >
      <Tab.Screen name="NewPost" component={NewPostStackScreen} options={{
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
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootStackScreen userToken={userToken} />
        </NavigationContainer>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}