import { View, Text } from "react-native";
import { Card } from "@rneui/base";
import theme from "../static/theme";

import React from "react";

const MyReportPost = ({ title, confirmations, refutations }) => {
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
          paddingHorizontal: 5,
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
              fontSize: 15,
            }}
          >
            Confirmed by : {confirmations}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme.darkColors.error,
              fontSize: 15,
              marginLeft: 10,
            }}
          >
            Refuted By : {refutations}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MyReportPost;
