import React, { useState, useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProvider } from "@rneui/themed";
import { Icon } from "@rneui/base";

import { PostContext } from "./src/context/PostContext";
import { ContractProvider } from "./src/context/ContractContext";
import { AuthContext } from "./src/context/AuthContext";
import { ReportPostContext } from "./src/context/ReportPostContext";

import theme from "./src/static/theme";
import NavigationBar from "./src/components/NavigationBar";
import "./global";
import {
  ConfirmPost,
  Dashboard,
  Login,
  Maximised,
  NewPost,
  Profile,
  Signup,
  NewsLang,
  ConfirmReportPost,
  ReportNewsLang,
  NewReportPost,
  MyPosts,
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
      name="Sign Up"
      component={Signup}
      options={{
        title: "Sign Up",
        headerStyle: {
          backgroundColor: "#40d1ff",
        },
      }}
    />
  </AuthStack.Navigator>
);

function NewPostStackScreen() {
  const [postData, setPostData] = useState({});
  return (
    <PostContext.Provider value={{ postData, setPostData }}>
      <NewPostStack.Navigator
        screenOptions={{
          header: (props) => <NavigationBar {...props} />,
        }}
      >
        <NewPostStack.Screen name="NewPost" component={NewPost} />
        <NewPostStack.Screen name="ConfirmPost" component={ConfirmPost} />
        <NewPostStack.Screen name="NewsLang" component={NewsLang} />
      </NewPostStack.Navigator>
    </PostContext.Provider>
  );
}

function DashboardStackScreen() {
  const [postData, setPostData] = useState({});
  return (
    <ReportPostContext.Provider value={{ postData, setPostData }}>
      <DashboardStack.Navigator
        screenOptions={{
          header: (props) => <NavigationBar {...props} />,
        }}
      >
        <DashboardStack.Screen name="Home" component={Dashboard} />
        <DashboardStack.Screen name="Maximised" component={Maximised} />
        <DashboardStack.Screen
          name="New Report Post"
          component={NewReportPost}
        />
        <DashboardStack.Screen
          name="Confirm Report Post"
          component={ConfirmReportPost}
        />
        <DashboardStack.Screen
          name="Report News Lang"
          component={ReportNewsLang}
        />
      </DashboardStack.Navigator>
    </ReportPostContext.Provider>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        header: (props) => <NavigationBar {...props} />,
      }}
    >
      <ProfileStack.Screen name="MyProfile" component={Profile} />
      <ProfileStack.Screen name="MyPosts" component={MyPosts} />
    </ProfileStack.Navigator>
  );
}

function MainTabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.darkColors.background,
          height: 60,
          marginTop: -20,
          borderWidth: 0,
          borderColor: theme.darkColors.primary,
        },
      }}
    >
      <Tab.Screen
        name="New"
        component={NewPostStackScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                color={
                  focused ? theme.darkColors.focused : theme.darkColors.grey
                }
                name="add"
                size={focused ? 40 : 30}
                type="material"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                color={
                  focused ? theme.darkColors.focused : theme.darkColors.grey
                }
                name="dashboard"
                size={focused ? 40 : 30}
                type="material"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                color={
                  focused ? theme.darkColors.focused : theme.darkColors.grey
                }
                name="person"
                size={focused ? 40 : 30}
                type="material"
              />
            );
          },
        }}
      />
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
        return true;
      },
      userToken,
    };
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <ContractProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <RootStackScreen userToken={userToken} />
          </NavigationContainer>
        </ThemeProvider>
      </ContractProvider>
    </AuthContext.Provider>
  );
}
