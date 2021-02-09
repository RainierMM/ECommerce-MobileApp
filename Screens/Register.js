import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import firebase from "../Config";

export default class Register extends React.Component {
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

  registrarUsuario = async () => {
    if (!this.state.email && !this.state.password) {
      Alert.alert("Debe completar los campos para registrarse !!");
    } else {
      this.setState({
        cargar: true,
      });
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );

        if (response) {
          this.setState({
            cargar: false,
            displayName: "",
            email: "",
            password: "",
          });
          Alert.alert("Se ha registrado correctamente!");
          this.props.navigation.navigate("Login");
        }
      } catch (error) {
        Alert.alert(
          error.code === "auth/email-already-in-use"
            ? "El email ingresado ya ha sido registrado!"
            : "Debe ingresar el email de forma correcta"
        );
        this.props.navigation.navigate("Login");
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
          placeholder="Clave"
          value={this.state.password}
          onChangeText={(val) => this.validarCampo(val, "password")}
          maxLength={10}
          secureTextEntry={true}
        />

        <TouchableHighlight
          style={styles.botonRegistrarse}
          onPress={this.registrarUsuario}
        >
          <Text styles={styles.textoBoton}>REGISTRARSE</Text>
        </TouchableHighlight>

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          Ya estás registrado? Click aqui para acceder
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
