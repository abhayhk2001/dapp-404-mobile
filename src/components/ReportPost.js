import { View, Text } from "react-native";
import { Card, Button } from "@rneui/base";
import confirmReport from "../helper/confirmReport";
import refuteReport from "../helper/refuteReport";
import { ContractContext } from "../context/ContractContext";
import theme from "../static/theme";

import React, { useContext } from "react";

const ReportPost = ({ id, title, confirmations, refutations }) => {
  const { backendContract, backendProvider, account } =
    useContext(ContractContext);
  return (
    <View>
      <Card.Divider />
      <Text style={{ color: theme.darkColors.white, fontSize: 15 }}>
        {title}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginRight: 10,
              color: theme.darkColors.success,
              fontSize: 20,
            }}
          >
            {confirmations}
          </Text>
          <Button
            type="solid"
            color={theme.darkColors.success}
            onPress={() => {
              confirmReport(backendContract, backendProvider, id, account);
            }}
          >
            Confirm
          </Button>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            type="solid"
            color={theme.darkColors.error}
            onPress={() => {
              refuteReport(backendContract, backendProvider, id, account);
            }}
          >
            Refute
          </Button>
          <Text
            style={{
              color: theme.darkColors.error,
              fontSize: 20,
              marginLeft: 10,
            }}
          >
            {refutations}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReportPost;
