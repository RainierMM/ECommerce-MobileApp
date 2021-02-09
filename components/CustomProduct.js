import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button } from "react-native";
import { StyleSheet, Image, ImageBackground, Text, View } from "react-native";
import { Card } from "react-native-elements";
//---------------------------

export default class CustomProduct extends React.Component {
  render() {
    return (
      <ImageBackground source={this.props.imageSource} style={styles.image}>
        <Text style={styles.overlayTitulo}>{this.props.nombre}</Text>
        <Text style={styles.overlayText}>{this.props.precio}</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  overlayTitulo: {
    // Fondos iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // Fondos Android
    elevation: 1,
    alignSelf: "flex-start",
    fontSize: 18,
    color: "#292929",
    textAlign: "center",
    padding: 10,
    marginTop: 115,
    backgroundColor: "rgba(255,255,255, 0.6)",
    fontWeight: "bold",
  },
  overlayText: {
    // Fondos iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    // Fondos Android
    elevation: 1,

    alignSelf: "flex-start",
    fontSize: 14,
    fontStyle: "italic",
    color: "#292929",
    textAlign: "center",
    padding: 8,
    backgroundColor: "rgba(255,255,255, 0.6)",
  },
});
