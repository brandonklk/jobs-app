import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Image, Text } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { styleMapsJobs } from "@/styles/mapsstyles";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../src/Services/firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const PinIcon = require('../../assets/pin.png');

export default function Map() {
  const [location, setLocation] = useState<LocationObject>({} as LocationObject);
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [searchInput, setSearchInput] = useState("");
  const [markers, setMarkers] = useState<JSX.Element[]>([]);

  const requestLocationPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      setRegion({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  const searchProfessionals = async () => {
    const dbRef = firebase.database().ref('data');
  
    dbRef.once('value').then((snapshot) => {
      const professionals = snapshot.val();
      const newMarkers = [];
  
      const userLatitude = region?.latitude || 0;
      const userLongitude = region?.longitude || 0;
      const radius = 0.1; // Ajuste o raio conforme necessário
  
      for (const professionalId in professionals) {
        const professional = professionals[professionalId];
  
        if (
          professional &&
          professional.coords &&
          professional.coords['0'] &&
          professional.coords['1']
        ) {
          const latitude = professional.coords['0'];
          const longitude = professional.coords['1'];
  
          const distance = Math.sqrt(
            Math.pow(userLatitude - latitude, 2) + Math.pow(userLongitude - longitude, 2)
          );
  
          if (
            distance <= radius &&
            (professional.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
              professional.serv?.toLowerCase().includes(searchInput.toLowerCase()))
          ) {
            newMarkers.push(
              <Marker
                key={professionalId}
                coordinate={{ latitude, longitude }}
                title={professional.name || ''}
                // icon={<CustomMarker title={professional.name || ''} />} // Removido o pino personalizado
              />
            );
          }
        }
      }
  
      setMarkers(newMarkers);
    }).catch((error) => {
      console.error('Error fetching professionals:', error);
    });
  };


  useEffect(() => {
    requestLocationPermissions();
    searchProfessionals();
  }, [searchInput]);

  return (
    <View style={styleMapsJobs.containerMap}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Profissionais"
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
      </View>
      {region && (
        <MapView initialRegion={region} style={styleMapsJobs.mapJobs}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.props.coordinate.latitude,
                longitude: marker.props.coordinate.longitude,
              }}
              title={marker.props.title}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({ 
  searchContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 16, 
    paddingTop: 45, 
    backgroundColor: "white",
  }, 
  searchIcon: { 
    marginRight: 8, 
  }, 
  searchInput: { 
    flex: 1, 
    height: 40, 
    borderWidth: 1, 
    borderColor: "black", 
    borderRadius: 8, 
    paddingHorizontal: 8, 
  },
});
