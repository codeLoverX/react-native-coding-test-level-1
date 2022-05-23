import React, { useState } from "react";
import { View, ScrollView, Form, Dimensions, Linking, TouchableHighlight, Image, TextInput } from "react-native";
import {
  Layout,
  Text,
  Button,
  Section,
  SectionContent,
} from "react-native-rapi-ui";
import TopNavCustom from '../components/TopNav';
import { Ionicons } from "@expo/vector-icons";

const windowHeight = Dimensions.get('window').height;

export default function ({ navigation }) {
  const [text, setText] = useState("");
  const [isReady, setIsReady] = useState(false);
  return (
    <Layout>
      <TopNavCustom
        middleContentName="Home"
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            minHeight: windowHeight * 3 / 4
          }}
        >
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Pokedex");
            }}
          >
            <Image
              style={{
                width: 220,
                height: 220,
                margin: 20,
                display: !isReady ? "none" : "flex"
              }}
              source={{ uri: 'https://www.freeiconspng.com/uploads/file-pokeball-png-0.png' }}
            />
          </TouchableHighlight>
          <Section
            style={{
              alignItems: "stretch",
              padding: 20
            }}>
            <SectionContent>
              {/* <Text>
                Requirement: Try to show the hidden image and make it clickable that
                goes to /pokedex when the input below is "Ready!" remember to hide the
                red text away when "Ready!" is in the textbox.

              </Text> */}
              <Text style={{ marginBottom: 10 }}>Are you ready to be a pokemon master?</Text >
              <TextInput
                editable
                numberOfLines={2}
                onChangeText={(text) => {
                  setText(text);
                  if (text.toUpperCase() === "READY")
                    setIsReady(true);
                }}
                value={text}
                style={
                  {
                    borderColor: "black",
                    borderWidth: 1,
                    paddingLeft: 20
                  }
                }
                maxLength={40}
              />
              <Text style={
                {
                  color: "red",
                  display: isReady ? "none" : "flex",
                  marginTop: 10
                }}
              >I am not ready yet!
              </Text >
              
            </SectionContent>
          </Section>
        </View>
      </ScrollView>
    </Layout >
  );
}
