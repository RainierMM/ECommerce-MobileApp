import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import firebase from "../Config";
import Header from "../components/Header";

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
        this.props.navigation.navigate("Login");
      })
      .catch((error) => this.setState({ errorMensaje: error.message }));
  };

  componentDidMount() {
    const items = firebase.database().ref(`ehommerce/compras`);
    items.on("value", (datasnap) => {
      let data = datasnap.val();
      let campos = Object.values(data);
      this.setState({ campos });
    });
  }

  render() {
    console.log("CAMPOS", this.state.campos);
    this.state = {
      email: firebase.auth().currentUser.email,
      id: firebase.auth().currentUser.uid,
    };
    return (
      <>
        <Header navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={styles.textStyle}>Bienvenido, {this.state.email}</Text>

          <TouchableHighlight
            style={styles.botonRegistrarse}
            onPress={() => this.cerrarSesion()}
          >
            <Text style={styles.textoBoton}>CERRAR SESION</Text>
          </TouchableHighlight>
        </View>
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
  },
  botonRegistrarse: {
    width: 180,
    backgroundColor: "#0877AF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    alignContent: "center",
    marginBottom: 200,
    elevation: 10,
  },
  textoBoton: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 15,
  },
});
