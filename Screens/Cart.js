import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import firebase from "../Config";

const { width } = Dimensions.get("window");
const height = (width * 100) / 100; // 60%

let date = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();

let fechaHoy = `${date}/${month}/${year}`;

const insertarDatos = (dir, corr, tlf, precios, dia, imagen) => {
  firebase
    .database()
    .ref(`ehommerce/compras/${firebase.auth().currentUser.uid}`)
    .push({
      direccion: dir,
      email: corr,
      telefono: tlf,
      total: precios,
      fecha: dia,
      img: imagen,
    });
};

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direccion: "",
      email: firebase.auth().currentUser.email,
      telefono: "",
      total: "",
      fecha: fechaHoy,
      img: "",
      campos: [],
      active: 0,
    };
  }

  componentDidMount() {
    const items = firebase
      .database()
      .ref(`ehommerce/cart/${firebase.auth().currentUser.uid}`);
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
        let total = campos.reduce(
          (acc, { precio }) => acc + parseInt(precio),
          0
        );
        this.setState({ campos, total });
      }
    });
  }

  // Funcion para el click

  confirmacion = () => {
    let img = this.state.campos.reduce((acc, item, index) => {
      return {
        ...acc,
        [index]: item.img,
      };
    }, {});

    console.log("[CAMPOS-IMGS]", img);
    this.setState({ img });
    insertarDatos(
      this.state.direccion,
      this.state.email,
      this.state.telefono,
      this.state.total,
      this.state.fecha,
      this.state.img
    );

    Alert.alert(
      "Su compra ha sido registrada, por favor revise el estado en su perfil"
    );

    this.limpiarCarrito();
    this.props.navigation.navigate("Inicio");
  };

  limpiarCarrito = () => {
    firebase
      .database()
      .ref(`ehommerce/cart`)
      .child(firebase.auth().currentUser.uid)
      .remove();

    this.setState({
      campos: [],
    });
  };

  change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
  };

  borrarItem = () => {
    let { id } = this.state.campos[this.state.active];
    let newCampos = this.state.campos.filter((item) => item.id !== id);
    firebase
      .database()
      .ref(`ehommerce/cart/${firebase.auth().currentUser.uid}`)
      .child(id)
      .remove();
    this.setState({ campos: newCampos });
    Alert.alert("El item ha sido eliminado correctamente");
  };

  render() {
    const {
      navegar,
      props: { navigation },
      state: { campos },
    } = this;

    return (
      <>
        <Header navigation={navigation} />
        {campos.length > 0 ? (
          <>
            <View style={styles.container}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={this.change}
                horizontal
                style={styles.container}
              >
                {campos &&
                  campos.map((campo, index) => (
                    <Image
                      key={index}
                      source={{ uri: campo.img }}
                      style={styles.image}
                    />
                  ))}
              </ScrollView>
              <View style={styles.pagination}>
                {campos &&
                  campos.map((i, k) => (
                    <Text
                      key={k}
                      style={
                        k === this.state.active
                          ? styles.dotActiveColor
                          : styles.dotcolor
                      }
                    >
                      ⚫
                    </Text>
                  ))}
                <MaterialIcons
                  name="delete"
                  size={24}
                  color="black"
                  onPress={this.borrarItem}
                />
              </View>
            </View>
            <View style={styles.boxDetalle}>
              <TextInput
                style={styles.textInput}
                editable={false}
                selectTextOnFocus={false}
              >
                {firebase.auth().currentUser.email}
              </TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Teléfono"
                onChangeText={(telefono) => this.setState({ telefono })}
              />
            </View>
            <View style={styles.boxDetalle}>
              <TextInput
                style={styles.textInput}
                placeholder="Direccion"
                onChangeText={(direccion) => this.setState({ direccion })}
              />

              <TextInput
                style={styles.textInput}
                editable={false}
                selectTextOnFocus={false}
              >
                {fechaHoy}
              </TextInput>
            </View>
            <View style={styles.boxDetalle}>
              <TextInput
                style={styles.textInput}
                editable={false}
                selectTextOnFocus={false}
              >
                {`S/ ${this.state.total}`}
              </TextInput>
            </View>
            <View>
              <Button
                title="Comprar"
                color={"green"}
                onPress={this.confirmacion}
              />
            </View>
          </>
        ) : (
          <View>
            <Text>NO HAY ITEMS EN EL CARRITO</Text>
          </View>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  image: { width, height, resizeMode: "cover", borderRadius: 20 },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  dotcolor: { fontSize: width / 30, color: "#888", margin: 3 },
  dotActiveColor: { fontSize: width / 30, color: "black", margin: 3 },
  //  ------------------------------------------------------------------
  boxDetalle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    marginLeft: 10,
    width: 200,
    height: 30,
    textAlign: "center",
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1.5,
    color: "red",
  },
});
