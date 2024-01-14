import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ProductItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.productItem} onPress={onPress}>
    <Image source={{ uri: item.images[0]}} style={styles.productImage} />
    <Text style={styles.productTitle}>{item.title}</Text>
    <Text style={styles.productPrice}>${item.price}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default ProductItem;
