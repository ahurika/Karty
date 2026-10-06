import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const API_URL = 'https://karty-murex.vercel.app';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchCart = async () => {
    try {
      const token = await AsyncStorage.getItem('sessionToken');
      if (!token) {
        const localCart = await AsyncStorage.getItem('localCart');
        setCartItems(localCart ? JSON.parse(localCart) : []);
        return;
      }

      const response = await fetch(`${API_URL}/api/cart`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart?.items || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Re-fetch cart when tab is focused and set up polling
  useEffect(() => {
    let interval;
    if (isFocused) {
      fetchCart();
      interval = setInterval(() => {
        fetchCart();
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFocused]);

  const updateQuantity = async (productId, quantity) => {
    try {
      const token = await AsyncStorage.getItem('sessionToken');
      if (!token) {
        const localCart = await AsyncStorage.getItem('localCart');
        let cartItems = localCart ? JSON.parse(localCart) : [];
        if (quantity === 0) {
          cartItems = cartItems.filter(item => item.productId !== productId);
        } else {
          const item = cartItems.find(item => item.productId === productId);
          if (item) item.quantity = quantity;
        }
        await AsyncStorage.setItem('localCart', JSON.stringify(cartItems));
        setCartItems(cartItems);
        return;
      }
      
      await fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
      });
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.product.name}</Text>
              <Text style={styles.price}>₦{item.product.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => updateQuantity(item.productId, item.quantity - 1)} style={styles.qtyBtn}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qty}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(item.productId, item.quantity + 1)} style={styles.qtyBtn}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total: ₦{total}</Text>
          <TouchableOpacity style={styles.checkoutBtn} onPress={async () => {
            const token = await AsyncStorage.getItem('sessionToken');
            if (!token) {
              Alert.alert('Sign In Required', 'Please sign in to complete your purchase.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign In', onPress: () => navigation.navigate('Account') }
              ]);
            } else {
              Alert.alert('Checkout flow to be implemented');
            }
          }}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
  cartItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 16, marginBottom: 12, borderRadius: 8, alignItems: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#555', marginTop: 4 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 32, height: 32, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  qtyText: { fontSize: 18, fontWeight: 'bold' },
  qty: { marginHorizontal: 12, fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#888' },
  footer: { borderTopWidth: 1, borderColor: '#ddd', paddingTop: 16, marginTop: 16 },
  total: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  checkoutBtn: { backgroundColor: '#000', padding: 16, borderRadius: 8, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
