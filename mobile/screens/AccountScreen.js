import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

// Using the deployed Vercel URL so your iPhone can reach the backend over the internet!
const API_URL = 'https://karty-murex.vercel.app';

export default function AccountScreen() {
  const [token, setToken] = useState(null);
  const isFocused = useIsFocused();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: '662467349240-mqv4m4f02a0gcc30h0m5ifkqjphlipu7.apps.googleusercontent.com',
      redirectUri: 'https://karty-murex.vercel.app/api/auth/proxy',
      scopes: ['openid', 'profile', 'email'],
      responseType: 'id_token',
      extraParams: { nonce: 'dev_nonce' },
      usePKCE: false,
    },
    { authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth' }
  );

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
