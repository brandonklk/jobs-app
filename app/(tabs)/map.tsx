import { useState, useEffect } from "react"; 
import { View, TextInput, StyleSheet } from "react-native"; 
import MapView, { Marker, Region } from "react-native-maps"; 
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location"; 
import { Ionicons } from "@expo/vector-icons"; 
import { styleMapsJobs } from "@/styles/mapsstyles"; 

export default function Map() { 
  const [location, setLocation] = useState<LocationObject>({} as LocationObject); 
  const [region, setRegion] = useState<Region | undefined>(undefined); 
  const [searchInput, setSearchInput] = useState(""); 

  const requestLocationPermissions = async () => { 
    const { granted } = await requestForegroundPermissionsAsync(); 
    if (granted) { 
      const currentPosition = await getCurrentPositionAsync(); 
      console.log("currentPosition ", currentPosition); 
      setLocation(currentPosition); 
      setRegion({ 
        latitude: currentPosition.coords.latitude, 
        longitude: currentPosition.coords.longitude, 
        latitudeDelta: 0.005, 
        longitudeDelta: 0.005, 
      }); 
    } 
  }; 

  useEffect(() => { 
    requestLocationPermissions(); 
  }, []); 

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
        {/* lógica para buscar o profissional na região */}
      </View> 
      {region && ( 
        <MapView initialRegion={region} style={styleMapsJobs.mapJobs}> 
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} /> 
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
  }, 
  searchIcon: { 
    marginRight: 8, 
  }, 
  searchInput: { 
    flex: 1, 
    height: 40, 
    borderWidth: 1, 
    borderColor: "gray", 
    borderRadius: 8, 
    paddingHorizontal: 8, 
  }, 
});
