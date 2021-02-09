import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import firebase from "../Config";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const insertarDatos = (corr, nom, price, imagen) => {
  firebase
    .database()
    .ref(`ehommerce/cart/${firebase.auth().currentUser.uid}`)
    .push({
      email: corr,
      nombre: nom,
      precio: price,
      img: imagen,
    });
};

export default class Detalles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: firebase.auth().currentUser.email,
      nombre: this.props.route.params.nombre,
      precio: this.props.route.params.precio,
      img: this.props.route.params.img,
    };
  }

  confirmacion = () => {
    insertarDatos(
      this.state.email,
      this.state.nombre,
      this.state.precio,
      this.state.img
    );

    alert("El producto ha sido agregado al carrito correctamente");
  };

  render() {
    let producto = this.props.route.params;

    // console.log(producto.caracteristicas);
    return (
      <>
        <Header navigation={this.props.navigation} />
        <View style={styles.content}>
          <View style={styles.box}>
            <Image source={{ uri: producto.img }} style={styles.imagen} />
          </View>
          <ScrollView>
            <View style={styles.boxText}>
              <Text style={styles.nombreText}>{producto.nombre}</Text>
              <Text style={styles.precioText}>
                {`S/ ${producto.precio}`}
                <TouchableOpacity onPress={this.confirmacion}>
                  <View style={styles.icon}>
                    <MaterialCommunityIcons
                      name="cart-plus"
                      size={24}
                      color="black"
                    />
                  </View>
                </TouchableOpacity>
              </Text>
            </View>
            <View style={styles.boxText}>
              <Text style={styles.caracText}>{producto.caracteristicas}</Text>
              <Text style={styles.caracText}>{producto.medidas}</Text>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column",
  },
  box: {
    width: "100%",
    height: "55%",
    padding: 5,
  },
  imagen: {
    borderRadius: 15,
    height: "100%",
    resizeMode: "cover",
    width: "100%",
    alignSelf: "center",
  },
  nombreText: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
    color: "#4a4a4a",
  },
  boxText: {
    width: "97%",
    margin: 5,
    alignContent: "center",
    backgroundColor: "#faf8f7",
    borderRadius: 10,
  },
  boxText2: {
    width: "70%",
    margin: 5,
    alignContent: "center",
    backgroundColor: "#faf8f7",
    borderRadius: 10,
  },
  caracText: {
    fontSize: 16,
    padding: 5,
    color: "#4a4a4a",
  },
  precioText: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
    color: "red",
  },
  icon: {
    width: "100%",
    marginLeft: 300,
  },
});
