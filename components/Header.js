import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "../Config";
import { Alert } from "react-native";

//---------------------------

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  navegar = () => {
    const { navigation } = this.props;
    navigation.navigate("Inicio");
  };

  navegarPerfil = () => {
    if (!firebase.auth().currentUser) {
      Alert.alert("Inicie sesion para continuar");
      this.props.navigation.navigate("Login");
    } else {
      this.props.navigation.navigate("Perfil");
    }
  };

  navegarCart = () => {
    if (!firebase.auth().currentUser) {
      Alert.alert("Por favor inicie sesion");
      this.props.navigation.navigate("Login");
    } else {
      this.props.navigation.navigate("Cart");
    }
  };

  render() {
    return (
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={40}
          color="#0c1347"
          onPress={this.navegarPerfil}
          style={styles.icon}
        />
        <TouchableOpacity onPress={this.navegar}>
          <Image source={require("../img/cart.png")} style={styles.cart} />
        </TouchableOpacity>
        <Text style={styles.logo} onPress={this.navegar}>
          E-Hommerce
        </Text>

        <FontAwesome
          name="opencart"
          size={36}
          color="#0c1347"
          onPress={this.navegarCart}
          style={styles.icon2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    marginTop: 20,
    backgroundColor: "#fff6e2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderBottomWidth: 4,
    borderBottomColor: "#ccc",
  },
  cart: {
    width: 60,
    height: 60,
  },
  logo: {
    fontSize: 20,
    marginLeft: 5,
    fontStyle: "italic",
    color: "#292929",
    letterSpacing: 0.5,
  },
  icon: {
    position: "absolute",
    left: 25,
  },
  icon2: {
    position: "absolute",
    right: 20,
  },
});
