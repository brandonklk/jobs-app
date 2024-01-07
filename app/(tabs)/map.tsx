import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Image, Text, Modal, TouchableOpacity } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { styleMapsJobs } from "@/styles/mapsstyles";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../src/Services/firebaseConfig';
import Works from './works';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const PinIcon = require('../../assets/pin.png');

export default function Map() {
  const navigation = useNavigation();
  const [location, setLocation] = useState<LocationObject>({} as LocationObject);
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [searchInput, setSearchInput] = useState("");
  const [markers, setMarkers] = useState<JSX.Element[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  

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
  
    dbRef.once('value')
      .then((snapshot) => {
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
            professional.coords['1'] &&
            professional.name && // Garante que o nome esteja presente
            professional.serv && // Garante que a profissão esteja presente
            professional.photoURL // Garante que a URL da foto esteja presente
          ) {
            const latitude = professional.coords['0'];
            const longitude = professional.coords['1'];
  
            const distance = Math.sqrt(
              Math.pow(userLatitude - latitude, 2) + Math.pow(userLongitude - longitude, 2)
            );
  
            if (
              distance <= radius &&
              (professional.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                professional.serv.toLowerCase().includes(searchInput.toLowerCase()))
            ) {
              const marker = (
                <Marker
                  key={professionalId}
                  coordinate={{ latitude, longitude }}
                  title={professional.name}
                  onPress={() => setSelectedProfessional(professional)}
                />
              );
              newMarkers.push(marker);
            }
          }
        }
  
        setMarkers(newMarkers);
      })
      .catch((error) => {
        console.error('Error fetching professionals:', error);
      });
  };
  
  useEffect(() => {
    requestLocationPermissions();
    searchProfessionals();
  }, [searchInput]);

  const handleVerPerfil = (selectedProfessional: any) => {
    // Aqui você pode passar os detalhes do profissional para a próxima tela
    navigation.navigate('works', { professional: selectedProfessional });
  };
  
  
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
          {markers.map((marker, index) => marker)}
        </MapView>
      )}
    {/* Modal */}
<Modal
  visible={!!selectedProfessional}
  transparent
  animationType="slide"
>
<View style={styles.modalContainer}>
  {selectedProfessional && (
    <TouchableOpacity
      style={styles.modalContent}
      onPress={() => setSelectedProfessional(null)}
    >
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setSelectedProfessional(null)}
      >
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.professionalInfo}>
        <Image
          source={{ uri: selectedProfessional.photoURL }}
          style={styles.profileImage}
        />
        <Text style={[styles.name, { color: 'white' }]}>{selectedProfessional.name}</Text>
        <Text style={[styles.profession, { color: 'white' }]}>{selectedProfessional.serv}</Text>

        {/* Botão "Ver Perfil" */}
        <TouchableOpacity onPress={() => handleVerPerfil(selectedProfessional)} style={styles.verPerfilButton}>
  <Text style={styles.verPerfilButtonText}>Ver Perfil</Text>
</TouchableOpacity>

        </View>
      </TouchableOpacity>
    )}
  </View>
</Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#411A87',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative', // Adiciona um posicionamento relativo para os elementos filhos se posicionarem relativamente
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  professionalInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  profession: {
    fontSize: 16,
    color: 'white',
  },
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
    backgroundColor: 'white', 
  },
  verPerfilButton: {
    backgroundColor: '#BCE56C',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  verPerfilButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});