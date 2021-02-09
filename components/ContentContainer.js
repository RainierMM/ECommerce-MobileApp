import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
//---------------------------
import { Contexto } from "../Contexto";
import CustomImage from "./CustomImage";

export default class ContentContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  navegar = (nombre) => {
    const { navigation } = this.props;
    navigation.navigate(nombre);
  };
  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.column1}>
          <TouchableHighlight onPress={() => this.navegar("Sillas")}>
            <CustomImage
              imageSource={require("../img/sillas.jpg")}
              titulo="Sillas"
            />
          </TouchableHighlight>
        </View>
        <View style={styles.column2}>
          <TouchableHighlight onPress={() => this.navegar("Comedores")}>
            <CustomImage
              imageSource={require("../img/comedor.jpg")}
              titulo="Comedores"
            />
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style={styles.contentBanner}
          onPress={() => this.navegar("Muebles")}
        >
          <CustomImage
            imageSource={require("../img/muebles.jpg")}
            titulo="- Muebles -"
            descripcion="60% DE DESCUENTO"
          />
        </TouchableHighlight>
        <View style={styles.wcolumn2}>
          <TouchableHighlight onPress={() => this.navegar("Espejos")}>
            <CustomImage
              imageSource={require("../img/espejos.jpg")}
              titulo="Espejos"
            />
          </TouchableHighlight>
        </View>
        <View style={styles.column1}>
          <TouchableHighlight onPress={() => this.navegar("Decoracion")}>
            <CustomImage
              imageSource={require("../img/decoracion.jpg")}
              titulo="Decoración"
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

ContentContainer.contextType = Contexto;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
  },
  column1: {
    flex: 1,
    padding: 5,
  },
  column2: {
    flex: 2,
    padding: 5,
  },
  contentBanner: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});
