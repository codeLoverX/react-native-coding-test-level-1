import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Pokedex from "../screens/Pokedex";
import { AppProvider } from "../state/printReducer";

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Pokedex" component={Pokedex} />

      <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  );
};

export default () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AppProvider>
  );
};
