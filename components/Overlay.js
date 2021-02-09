import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
//---------------------------

export default class Overlay extends React.Component {
  render() {
    let titulo = this.props.titulo ? (
      <Text style={styles.overlayTitulo}>{this.props.titulo}</Text>
    ) : null;

    let descripcion = this.props.descripcion ? (
      <Text style={styles.overlayText}>{this.props.descripcion}</Text>
    ) : null;
    return (
      <View>
        {titulo}
        {descripcion}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlayTitulo: {
    // Fondos iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    // Fondos Android
    elevation: 1,

    alignSelf: "center",
    fontSize: 28,
    color: "#292929",
    textAlign: "center",
    padding: 10,
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

    alignSelf: "center",
    fontSize: 16,
    fontStyle: "italic",
    color: "#292929",
    textAlign: "center",
    padding: 8,
    marginTop: 8,
    backgroundColor: "rgba(255,255,255, 0.6)",
  },
});
