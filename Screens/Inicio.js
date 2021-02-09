import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//---------------------------
import { Contexto } from "../Contexto";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ContentContainer from "../components/ContentContainer";

export default class Inicio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header navigation={this.props.navigation} />
        <ScrollView style={styles.container}>
          <Banner navigation={this.props.navigation} />
          <ContentContainer navigation={this.props.navigation} />
        </ScrollView>
      </>
    );
  }
}
Inicio.contextType = Contexto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
