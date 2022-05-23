import React from "react";
import {
  TopNav,
  themeColor,
  useTheme
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({middleContentName}) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <TopNav
      middleContent={middleContentName}
      rightContent={
        <Ionicons
          name={isDarkmode ? "sunny" : "moon"}
          size={20}
          color={isDarkmode ? themeColor.white100 : themeColor.dark}
        />
      }
      rightAction={() => {
        if (isDarkmode) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
    />
  )
}