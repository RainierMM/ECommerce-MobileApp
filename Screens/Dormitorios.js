import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Contexto } from "../Contexto";
import Header from "../components/Header";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Boxes from "../components/Boxes";
import firebase from "../Config";

//     firebase.firestore().collection("productos").onSnapshot((querySnapshot) => {
//         querySnapshot.docs.forEach((doc) => {
//           console.log(doc.data());
//         });
//       });

const { width, height } = Dimensions.get("window");

let rows = 3;
const cols = 2;
const marginHorizontal = 2;
const marginVertical = 2;
export const maxWidth = width / cols - marginHorizontal * (cols + 1);
export const maxHeight = height / rows - marginVertical * (rows + 1);

export default class Dormitorios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campos: [],
    };
  }

  navegar = (campo) => {
    const { navigation } = this.props;
    navigation.navigate("Detalles", campo);
  };

  componentDidMount() {
    const items = firebase.database().ref(`ehommerce/dormitorios`);
    items.on("value", (datasnap) => {
      let data = datasnap.val();
      let campos = Object.values(data);
      this.setState({ campos });
    });
  }

  render() {
    const {
      navegar,
      props: { navigation },
      state: { campos },
    } = this;

    return (
      <>
        {console.log("[CAMPOS]", campos)}
        <Header navigation={navigation} />
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.sectionContainer}>
            {campos &&
              campos.map((campo, index) => (
                <TouchableOpacity key={index} onPress={() => navegar(campo)}>
                  <View style={styles.boxContainer}>
                    <Image source={{ uri: campo.img }} style={styles.image} />
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </>
    );
  }
}

Dormitorios.contextType = Contexto;

const styles = StyleSheet.create({
  boxContainer: {
    alignItems: "center",
    height: maxHeight,
    justifyContent: "space-evenly",
    margin: 2,
    width: maxWidth,
  },
  image: {
    borderRadius: 15,
    height: "100%",
    resizeMode: "cover",
    width: "100%",
  },
  sectionContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  scrollContainer: {
    flex: 1,
  },
});
