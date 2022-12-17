import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import theme from "../static/theme";
import { Button } from "@rneui/base";
import { AuthContext } from "../context/AuthContext";
import { ContractContext } from "../context/ContractContext";
const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const { login: _login } = useContext(ContractContext);
  const onPress = () => {
    _login(publicAddress.toLowerCase());
    login(publicAddress.toLowerCase());
  };

  const [publicAddress, setPublicAddress] = useState(
    "0xbe26757C4e5F124200830E98d5f13D1f95FceF5e"
  );
  return (
    <View style={styles.container}>
      <Text style={{ color: "white", marginBottom: 20, fontSize: 40 }}>
        Welcome back!
      </Text>
      <TextInput
        secureTextEntry={true}
        style={styles.textinput}
        placeholder="Wallet Address"
        placeholderTextColor={theme.darkColors.grey}
        value={publicAddress}
        onChangeText={(text) => {
          setPublicAddress(text);
        }}
      />
      <Button
        title="Connect to Wallet"
        buttonStyle={styles.button}
        onPress={() => {
          onPress();
        }}
      />
      <View style={{ flexDirection: "column", marginTop: 70 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Sign Up");
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
            Don't have an account?{" "}
            <Text style={{ color: theme.darkColors.secondary }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.darkColors.primary,
  },
  button: {
    backgroundColor: theme.darkColors.secondary,
    height: 50,
    width: 200,
    fontSize: 40,
  },
  textinput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: theme.darkColors.grey,
    padding: 10,
    marginVertical: 3,
    fontSize: 15,
    color: theme.darkColors.grey,
  },
});

export default Login;
