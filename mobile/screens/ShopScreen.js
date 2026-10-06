import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your computer's local IP address if running on a physical device
// OR use 'http://10.0.2.2:3000' for Android Emulator
const API_URL = 'https://karty-murex.vercel.app'; 

export default function ShopScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = async (product) => {
    try {
      const token = await AsyncStorage.getItem('sessionToken');
      if (!token) {
        const localCart = await AsyncStorage.getItem('localCart');
        let cartItems = localCart ? JSON.parse(localCart) : [];
        const existingItem = cartItems.find(item => item.productId === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cartItems.push({ id: Math.random().toString(), productId: product.id, quantity: 1, product });
        }
        await AsyncStorage.setItem('localCart', JSON.stringify(cartItems));
        Alert.alert('Added to cart!');
        return;
      }
      
      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });
      
      if (response.ok) {
        Alert.alert('Added to cart!');
      } else {
        Alert.alert('Failed to add to cart.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error adding to cart.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₦{item.price}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
  productCard: { backgroundColor: '#fff', padding: 16, marginBottom: 16, borderRadius: 8 },
  image: { width: '100%', height: 200, resizeMode: 'cover', borderRadius: 8 },
  name: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  price: { fontSize: 16, color: '#555', marginTop: 4 },
  button: { backgroundColor: '#000', padding: 12, borderRadius: 4, marginTop: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
