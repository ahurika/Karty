import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();
const API_URL = 'http://192.168.0.199:3000';

export default function AccountScreen() {
  const [token, setToken] = useState(null);
  const isFocused = useIsFocused();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: '662467349240-mqv4m4f02a0gcc30h0m5ifkqjphlipu7.apps.googleusercontent.com',
    iosClientId: '662467349240-l1qao2aabfaftpltena78vqa45l7u7gg.apps.googleusercontent.com',
    androidClientId: '662467349240-mqv4m4f02a0gcc30h0m5ifkqjphlipu7.apps.googleusercontent.com',
    redirectUri: 'https://karty-murex.vercel.app/api/auth/proxy',
  });

  useEffect(() => {
    AsyncStorage.getItem('sessionToken').then(setToken);
  }, [isFocused]);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      fetch(`${API_URL}/api/auth/mobile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: id_token })
      })
      .then(res => res.json())
      .then(async data => {
        if (data.sessionToken) {
          await AsyncStorage.setItem('sessionToken', data.sessionToken);
          setToken(data.sessionToken);
        }
      })
      .catch(err => console.error('Auth error', err));
    }
  }, [response]);

  const logout = async () => {
    await AsyncStorage.removeItem('sessionToken');
    setToken(null);
  };

  return (
    <View style={styles.container}>
      {token ? (
        <View style={styles.content}>
          <Text style={styles.title}>You are signed in!</Text>
          <Text style={styles.subtitle}>Your cart is synced with the Karty website.</Text>
          <Button title="Logout" color="#000" onPress={logout} />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Sign in with Google to sync your cart and place orders.</Text>
          <Button
            disabled={!request}
            title="Sign in with Google"
            onPress={() => promptAsync()}
          />
          <View style={{ marginTop: 12 }}>
            <Button
              title="Dev Bypass Login (Expo Go Fix)"
              color="#28a745"
              onPress={() => {
                fetch(`${API_URL}/api/auth/mobile`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ idToken: 'dev-token' })
                })
                .then(res => res.json())
                .then(async data => {
                  if (data.sessionToken) {
                    await AsyncStorage.setItem('sessionToken', data.sessionToken);
                    setToken(data.sessionToken);
                  }
                })
                .catch(err => console.error('Auth error', err));
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', justifyContent: 'center', padding: 24 },
  content: { backgroundColor: '#fff', padding: 24, borderRadius: 8, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 24 }
});
