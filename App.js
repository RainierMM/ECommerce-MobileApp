import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//---------------------------
import { Contexto } from "./Contexto";
import Inicio from "./Screens/Inicio";
import Dormitorios from "./Screens/Dormitorios";
import Sillas from "./Screens/Sillas";
import Comedores from "./Screens/Comedores";
import Muebles from "./Screens/Muebles";
import Decoracion from "./Screens/Decoracion";
import Espejos from "./Screens/Espejos";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Perfil from "./Screens/Perfil";
import Detalles from "./Screens/Detalles";
import Cart from "./Screens/Cart";

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Contexto.Provider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Dormitorios" component={Dormitorios} />
            <Stack.Screen name="Sillas" component={Sillas} />
            <Stack.Screen name="Comedores" component={Comedores} />
            <Stack.Screen name="Muebles" component={Muebles} />
            <Stack.Screen name="Decoracion" component={Decoracion} />
            <Stack.Screen name="Espejos" component={Espejos} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Perfil" component={Perfil} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Detalles" component={Detalles} />
          </Stack.Navigator>
        </NavigationContainer>
      </Contexto.Provider>
    );
  }
}
export default App;
