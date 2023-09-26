import { useState, useEffect } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { View } from "react-native";
import { styleMapsJobs } from "@/styles/mapsstyles";

export default function Map() {
  const [location, setLocation] = useState<LocationObject>(
    {} as LocationObject
  );
  const [region, setRegion] = useState<Region | undefined>(undefined);

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
      {region && (
        <MapView initialRegion={region} style={styleMapsJobs.mapJobs}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        </MapView>
      )}
    </View>
  );
};
