import React, { useState, useContext } from "react";
import theme from "../static/theme";

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "@rneui/base";
import { ContractContext } from "../context/ContractContext";

const Signup = ({ navigation }) => {
  const { signup } = useContext(ContractContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <Text
          style={{
            textAlign: "left",
            color: "white",
            fontWeight: "bold",
            fontSize: 35,
          }}
        >
          Welcome!
        </Text>
        <Text
          style={{
            textAlign: "left",
            color: "white",
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          Let's get you started
        </Text>
      </View>
      <View style={{ marginTop: 25 }}>
        <TextInput
          style={styles.textinput}
          placeholder="Name"
          placeholderTextColor={theme.darkColors.grey}
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
          <TextInput
            style={styles.textinput}
            placeholder="Email"
            value={email}
            placeholderTextColor={theme.darkColors.grey}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
        <TextInput
          style={styles.textinput}
          placeholder="Public Address"
          value={publicAddress}
          placeholderTextColor={theme.darkColors.grey}
          onChangeText={(text) => {
            setPublicAddress(text);
          }}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.textinput}
          placeholder="Password"
          placeholderTextColor={theme.darkColors.grey}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Button
          type="solid"
          color={theme.darkColors.secondary}
          onPress={() => {
            signup({
              name,
              publicAddress,
              email,
              password,
            });
            navigation.navigate("Login")
          }}
        >
          <Text style={{ fontSize: 25, color: "white", borderRadius: 10 }}>
            Dive in
          </Text>
        </Button>
        <TouchableOpacity
          onPress={() => {
            // console.log(name, password, email, publicAddress);
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: theme.darkColors.grey,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            {" "}
            Already a member?{" "}
            <Text style={{ color: theme.darkColors.secondary }}>
              Login
            </Text>{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.darkColors.grey,
    padding: 10,
    marginVertical: 3,
  },
  textinput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.darkColors.grey,
    padding: 10,
    marginVertical: 3,
    fontSize: 15,
    color: theme.darkColors.grey,
  },
});

export default Signup;
