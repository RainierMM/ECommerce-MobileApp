import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default class Boxes extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <TouchableOpacity onPress={this.props.navegar1}>
            <Image source={this.props.imageSource} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "85%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  box: {
    width: "50%",
    height: 200,
    padding: 5,
  },
  image: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    borderRadius: 15,
  },
});
