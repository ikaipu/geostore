/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'react-native-firebase';
import GeoFire from 'geofire';


const ref = firebase.database().ref();

const geoFire = new GeoFire(ref);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    setTimeout(() => geoFire.set("harley", [36.00, -122.01]).then(function() {
      console.log("Provided key has been added to GeoFire");
    }, function(error) {
      console.log("Error: " + error);
    }), 10000);
    setTimeout(() => geoFire.set("harley", [36.00, -122.03]).then(function() {
      console.log("Provided key has been added to GeoFire");
    }, function(error) {
      console.log("Error: " + error);
    }), 11000);

    setTimeout(() => geoFire.set("takumi", [36.00, -122.01]).then(function() {
      console.log("Provided key has been added to GeoFire");
    }, function(error) {
      console.log("Error: " + error);
    }), 10000);
    setTimeout(() => geoFire.set("takumi", [36.00, -122.03]).then(function() {
      console.log("Provided key has been added to GeoFire");
    }, function(error) {
      console.log("Error: " + error);
    }), 11000);

    var geoQuery = geoFire.query({
      center: [36.00, -122.00],
      radius: 1.5
    });
    geoQuery.on("ready", function() {
      console.log("GeoQuery has loaded and fired all other events for initial data");
    });


    geoQuery.on("key_entered", function(key, location, distance) {
      console.log(key + " entered query at " + location + " (" + distance + " km from center)");
    });

    geoQuery.on("key_moved", function(key, location, distance) {
      console.log(key + " moved within query to " + location + " (" + distance + " km from center)");
    });

    geoQuery.on("key_exited", function(key, location, distance) {
      console.log(key + " exited query to " + location + " (" + distance + " km from center)");
    });



  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
