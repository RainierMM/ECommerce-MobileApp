import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image, View, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
//---------------------------
import Overlay from "./Overlay";

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
  }
  navegar = () => {
    const { navigation } = this.props;
    navigation.navigate("Dormitorios");
  };
  render() {
    return (
      <>
        <TouchableOpacity onPress={this.navegar}>
          <ImageBackground
            source={require("../img/dormitorios.jpg")}
            style={styles.banner}
          >
            <Overlay
              titulo="- Dormitorios -"
              descripcion="-50% DE DESCUENTO-"
            />
          </ImageBackground>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
