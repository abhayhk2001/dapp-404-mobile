import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import theme from "../static/theme";
import { ListItem } from "@rneui/themed";
import { Button } from "@rneui/base";

import { Avatar } from "@rneui/base";
import { backendURL } from "../utils/constants";
import { ContractContext } from "../context/ContractContext";
const Profile = ({ navigation }) => {
  const [data, setData] = useState({
    name: "",
  });
  const { account } = useContext(ContractContext);
  useEffect(() => {
    fetch(`${backendURL}/profile/${account}`).then((data) => {
      data.json().then(
        (data) => {
          console.log(data);
          setInitials(getInitials(data.name));
          setData(data);
        } /*must set username & data here*/
      );
    });
    fetch(`${backendURL}/post/getuserposts/${account}`).then((data) =>
      data.json().then((data) => console.log())
    );
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
            style={{ color: theme.darkColors.white, fontSize: 20 }}
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
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "600",
  },
  body: {
    marginTop: 70,
  },
});
