import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

const QiblaFinder = () => {
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Request permission to access the device's location
    Geolocation.requestAuthorization("always").then((granted) => {
      if (granted) {
        // Get the current location
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Fetch the Qibla direction using an API (e.g., Qibla API)
            axios.get(`https://api.example.com/qibla?lat=${latitude}&lon=${longitude}`)
              .then((response) => {
                setQiblaDirection(response.data.qiblaDirection);
              })
              .catch((error) => {
                console.error('Error fetching Qibla direction:', error);
              });

            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }
    });
  }, []);

  if (!qiblaDirection || !userLocation) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Your current location: {userLocation.latitude}, {userLocation.longitude}</Text>
      <Text>Qibla direction: {qiblaDirection} degrees</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QiblaFinder;
