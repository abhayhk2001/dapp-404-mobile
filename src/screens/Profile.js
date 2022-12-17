import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Linking,
} from "react-native";
import theme from "../static/theme";
import { ListItem } from "@rneui/themed";
import { Button } from "@rneui/base";

import { Avatar } from "@rneui/base";
import { backendURL, userContractAddress } from "../utils/constants";
import { ContractContext } from "../context/ContractContext";
import getUserBalance from "../helper/getUserBalance";
const Profile = ({ navigation }) => {
  const [data, setData] = useState({
    name: "",
  });
  const { userAccount, backendUserContract } = useContext(ContractContext);
  useEffect(() => {
    fetch(`${backendURL}/profile/${userAccount}`).then((data) => {
      data.json().then(
        (data) => {
          getUserBalance(backendUserContract, userAccount).then((balance) => {
            data.balance = balance;
            setInitials(getInitials(data.name));
            setData(data);
          });
        } /*must set username & data here*/
      );
    });
  }, []);

  function getInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }
  function generateRandomColor() {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }
  const [initials, setInitials] = useState("");
  const [bgColor, setBgColor] = useState(generateRandomColor());
  const [amount, setAmount] = useState(0);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}></View>

      <Avatar
        size={64}
        rounded
        title={initials}
        containerStyle={{
          backgroundColor: bgColor,
          width: 130,
          height: 130,
          borderRadius: 75,
          marginBottom: 10,
          alignSelf: "center",
          position: "absolute",
          marginTop: 130,
        }}
      />
      <ScrollView
        style={styles.body}
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.name}>Hi, {data.name}</Text>

        <Options
          list={[
            { name: "Name: " + data?.name },
            { name: "Email: " + data?.email },
            { name: "Balance: " + parseInt(data?.balance) / 1e18 },
          ]}
          name={"Personal Details"}
        />
        <Options
          list={[
            { name: "Public ID: " + data?.public_id },
            {
              name:
                "Account Created on: " +
                new Date(data.creation_date).toDateString(),
            },
          ]}
          name={"Account Details"}
        />
        <Button
          type="solid"
          color={theme.darkColors.secondary}
          onPress={() => {
            navigation.navigate("MyPosts");
          }}
          containerStyle={{ marginTop: 30, width: 150 }}
        >
          My Posts
        </Button>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "white",
            marginTop: 30,
            padding: 20,
          }}
        >
          <TextInput
            style={styles.textinput}
            placeholder="Enter Amount"
            placeholderTextColor={theme.darkColors.grey}
            onChangeText={(text) => {
              setAmount(text);
            }}
          />
          <Button
            type="solid"
            color={theme.darkColors.secondary}
            onPress={async () => {
              try {
                const url = `https://metamask.app.link/send/pay-${userContractAddress}@80001?value=${parseInt(
                  parseFloat(amount) * 1e18
                )}`;
                console.log(url);
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  await Linking.openURL(url);
                } else {
                  Alert.alert(`Don't know how to open this URL: ${url}`);
                }
              } catch (err) {
                console.log(err);
              }
            }}
            containerStyle={{ marginTop: 10, marginBottom: 30, width: 150 }}
          >
            Fund
          </Button>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

function Options({ list, name }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <ListItem.Accordion
      containerStyle={{
        marginTop: 30,
        backgroundColor: theme.darkColors.secondary,
        borderRadius: 30,
      }}
      content={
        <View
          style={{
            width: "70%",
            paddingLeft: 20,
            backgroundColor: theme.darkColors.secondary,
          }}
        >
          <ListItem.Title
            style={{ fontSize: 20, color: theme.darkColors.white }}
          >
            {name}
          </ListItem.Title>
        </View>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      {list.map((l, i) => (
        <ListItem key={i} containerStyle={{ width: 325 }}>
          <ListItem.Title
            style={{ color: theme.darkColors.white, fontSize: 15 }}
          >
            {l.name}
          </ListItem.Title>
        </ListItem>
      ))}
    </ListItem.Accordion>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.darkColors.background,
  },
  header: {
    backgroundColor: theme.darkColors.secondary,
    height: 200,
  },
  name: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "600",
  },
  textinput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    marginTop: 10,
    marginVertical: 3,
    fontSize: 20,
    color: theme.darkColors.grey,
  },
  body: {
    marginTop: 70,
  },
});
