import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Card, Icon, Button } from "@rneui/base";

// import { ReportPostContext } from "../context/ReportPostContext";
import { ContractContext } from "../context/ContractContext";

import theme from "../static/theme";
import MyReportPost from "./MyReportPost";
import getPostByID from "../helper/getPostsByID";

const Post = ({
  title,
  description,
  navigation,
  truthRating,
  truth = true,
  ad,
  img,
  postID,
  tag,
  views,
  reportIDs,
}) => {
  // const { setPostData } = useContext(ReportPostContext);
  const [reportsVisible, setReportsVisible] = useState(false);
  const [reports, setReports] = useState([]);
  const { backendContract } = useContext(ContractContext);

  useEffect(() => {
    if (reportIDs && reportIDs.length != 0) {
      let tags = reportIDs.map((id) => {
        return [id, 0];
      });
      getPostByID(backendContract, tags)
        .then((_posts) => {
          setReports(_posts);
        })
        .catch((err) => {
          console.log(err, userToken);
        });
    }
  }, []);

  return (
    <View>
      <Card
        containerStyle={{
          marginHorizontal: 1,
          maxWidth: "100%",
          borderRadius: 30,
          backgroundColor: theme.darkColors.primary,
          borderWidth: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (reportIDs.length > 0) setReportsVisible(!reportsVisible);
          }}
          // onLongPress={() => {
          //   setPostData({
          //     title: title,
          //     description: description,
          //     truthPercentage: truthRating,
          //     tagID: tag.id,
          //     tagName: tag.name,
          //     originPostInfo: {
          //       id: postID,
          //       title: title,
          //       description: description,
          //       truthPercentage: truthRating,
          //       tag: tag,
          //     },
          //     views,
          //   });
          //   navigation.navigate("Maximised");
          // }}
        >
          <Card.Title style={{ fontSize: 20, color: "white" }}>
            {title}
          </Card.Title>
        </TouchableOpacity>
        <Card.Divider />
        <View
          style={{
            position: "relative",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white" }}>{description}</Text>
        </View>
        <Card.Divider />
        <View
          style={{
            marginHorizontal: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              color={theme.darkColors.secondary}
              name="visibility"
              size={30}
              type="material"
            />
            <Text
              style={{
                color: theme.darkColors.white,
                paddingLeft: 5,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {views}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: "100%",
              // flex: 1
            }}
          >
            <Text
              style={{
                fontSize: 23,
                paddingTop: 1,
                fontWeight: "bold",
                color:
                  truthRating > 50
                    ? theme.darkColors.success
                    : theme.darkColors.error,
              }}
            >
              {truthRating}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              color={theme.darkColors.error}
              name="flag"
              size={30}
              type="material"
            />
            <Text
              style={{
                color: theme.darkColors.white,
                paddingLeft: 5,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {reportIDs.length}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            type="solid"
            color={theme.darkColors.error}
            onPress={() => {}}
          >
            Withdraw
          </Button>
        </View>
        {reportsVisible ? (
          <>
            <Card.Divider />
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={{ marginBottom: 10, color: theme.darkColors.white }}>
                Reported By
              </Text>
              {reports.map((report) => (
                <MyReportPost
                  key={report.id}
                  id={report.id}
                  title={report.title}
                  confirmations={report.confirmations}
                  refutations={report.refutations}
                />
              ))}
            </View>
          </>
        ) : (
          <></>
        )}
      </Card>
    </View>
  );
};

export default Post;
