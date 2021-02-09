import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image, ImageBackground } from "react-native";
//---------------------------
import Overlay from "./Overlay";

export default class CustomImage extends React.Component {
  render() {
    return (
      <ImageBackground source={this.props.imageSource} style={styles.image}>
        <Overlay
          titulo={this.props.titulo}
          descripcion={this.props.descripcion}
        />
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
  },
});
