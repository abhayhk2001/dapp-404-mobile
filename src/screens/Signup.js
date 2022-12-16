import React, { useState, useContext } from "react";
import theme from "../static/theme";

import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
import { Button } from "@rneui/base";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <Text style={{ textAlign: "center", fontSize: 40 }}>
          Signup to CheckMate
        </Text>
      </View>
      <View style={{ marginTop: 25 }}>
        <View style={styles.option_view}>
          <TextInput
            style={styles.textinput}
            placeholder="Enter your Name"
            placeholderTextColor={"white"}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>
        <View style={styles.option_view}>
          <TextInput
            style={styles.textinput}
            placeholder="Enter Username"
            placeholderTextColor={"white"}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
        </View>
        <View style={styles.option_view}>
          <TextInput
            style={styles.textinput}
            placeholder="Enter your Email"
            value={email}
            placeholderTextColor={"white"}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
        </View>
        <View style={styles.option_view}>
          <TextInput
            style={styles.textinput}
            placeholder="Enter your Public Address"
            value={publicAddress}
            placeholderTextColor={"white"}
            onChangeText={(text) => {
              setPublicAddress(text);
            }}
          />
        </View>
      </View>
      <View style={{ marginVertical: 20 }}>
        <Button
          type="solid"
          color={theme.darkColors.secondary}
          onPress={() => {
            console.log(name, username, email, publicAddress);
            navigation.navigate("Login");
          }}
        >
          <Text style={{ fontSize: 25 }}>Start Reading</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 40,
    backgroundColor: theme.darkColors.background,
    height: "100%",
  },
  multilineText: {
    borderColor: "white",
    borderWidth: 1,
    color: theme.darkColors.white,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 20,
    textAlignVertical: "top",
    paddingVertical: 10,
    marginTop: 20,
    maxHeight: 300,
  },
  option_view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.darkColors.secondary,
    padding: 10,
    marginVertical: 20,
  },
  textinput: {
    fontSize: 20,
    color: theme.darkColors.white,
  },
});

export default Signup;
