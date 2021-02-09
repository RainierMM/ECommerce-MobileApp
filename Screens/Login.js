import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableHighlight,
} from "react-native";

import firebase from "../Config";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      cargar: false,
    };
  }

  validarCampo = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  accederUsuario = async () => {
    if (!this.state.email && !this.state.password) {
      Alert.alert("Complete los campos para acceder a tu cuenta!");
    } else {
      this.setState({
        cargar: true,
      });
      try {
        const credencialesUsuario = await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password);
        if (credencialesUsuario) {
          this.setState({
            cargar: false,
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Inicio");
        }
      } catch (error) {
        this.setState({
          cargar: false,
          email: "",
          password: "",
        });
        Alert.alert("Error al autenticar usuario");
      }
    }
  };

  render() {
    if (this.state.cargar) {
      return (
        <View style={styles.preCargar}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.estiloInput}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.validarCampo(val, "email")}
        />
        <TextInput
          style={styles.estiloInput}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.validarCampo(val, "password")}
          maxLength={15}
          secureTextEntry={true}
        />
        <TouchableHighlight
          style={styles.botonRegistrarse}
          color="#0877AF"
          onPress={() => this.accederUsuario()}
        >
          <Text style={styles.textoBoton}>ACCEDER</Text>
        </TouchableHighlight>
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          ¿No estás registrado? Haz click aqui !
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
  },

  estiloInput: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    color: "black",
  },
  loginText: {
    color: "#0877AF",
    marginTop: 40,
    textAlign: "center",
    elevation: 8,
  },
  preCargar: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  fondo: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  botonRegistrarse: {
    width: "50%",
    backgroundColor: "orange",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 20,
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
