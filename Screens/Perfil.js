import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import firebase from "../Config";
import Header from "../components/Header";
import { Image } from "react-native";

let rutaFondo = require("../assets/Background/fondoE.jpg");

export default class Perfil extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      id: "",
      campos: [],
    };
  }

  cerrarSesion = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Inicio");
      })
      .catch((error) => this.setState({ errorMensaje: error.message }));
  };

  componentDidMount() {
    const items = firebase
      .database()
      .ref(`ehommerce/compras/${firebase.auth().currentUser.uid}`);
    items.on("value", (datasnap) => {
      let data = datasnap.val();
      if (data) {
        let campos = Object.entries(data).reduce(
          (acc, item) => [
            ...acc,
            {
              id: item[0],
              ...item[1],
            },
          ],
          []
        );

        this.setState({ campos });
      }
    });
  }

  render() {
    const {
      state: { campos },
    } = this;

    this.state = {
      email: firebase.auth().currentUser.email,
      id: firebase.auth().currentUser.uid,
    };
    return (
      <>
        <Header navigation={this.props.navigation} />
        <ImageBackground source={rutaFondo} style={styles.fondo}>
          <View style={styles.container}>
            <Text style={styles.textStyle}>Bienvenido, {this.state.email}</Text>
            {campos.length > 0 ? (
              <>
                <View style={{ flex: 1, marginTop: 40 }}>
                  <ScrollView>
                    {campos.map((campo, index) => (
                      <>
                        <View key={index} style={styles.listItem}>
                          <Text
                            style={{ fontWeight: "bold" }}
                          >{`Fecha de compra : ${campo.fecha}`}</Text>
                          <Text
                            style={{ fontWeight: "bold" }}
                          >{`Total a pagar : S/ ${campo.total}`}</Text>
                          <Text
                            style={{ fontWeight: "bold" }}
                          >{`Estado del pedido : ${campo.estado}`}</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                          {campo.img.length > 0 &&
                            campo.img.map((imagen, j) => (
                              <Image
                                key={j}
                                source={{ uri: imagen }}
                                style={styles.imagenR}
                              />
                            ))}
                        </View>
                      </>
                    ))}
                  </ScrollView>
                </View>
              </>
            ) : (
              <View>
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 50,
                    fontWeight: "bold",
                  }}
                >
                  NO TIENE COMPRAS ACTIVAS
                </Text>
              </View>
            )}

            <TouchableHighlight
              style={styles.botonRegistrarse}
              onPress={() => this.cerrarSesion()}
            >
              <Text style={styles.textoBoton}>CERRAR SESION</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
    marginTop: 20,
  },
  botonRegistrarse: {
    width: 180,
    backgroundColor: "#F68C00",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    alignContent: "center",
    marginBottom: 100,
    marginTop: 50,
    elevation: 7,
  },
  textoBoton: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 15,
  },
  listItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    marginTop: 30,
    backgroundColor: "#90E271",
    borderRadius: 25,
  },
  fondo: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  imagenR: {
    width: "100%",
    resizeMode: "cover",
  },
});
