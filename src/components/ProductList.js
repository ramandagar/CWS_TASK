import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const ProductListItem = ({ item, onPress, customStyles }) => (
  <TouchableOpacity style={[styles.productItem, customStyles.productItem]} onPress={() => onPress(item)}>
    <Image source={{ uri: item.image }} style={[styles.productImage, customStyles.productImage]} />
    <Text style={[styles.productTitle, customStyles.productTitle]}>{item.title}</Text>
    <Text style={[styles.productPrice, customStyles.productPrice]}>${item.price}</Text>
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

export default ProductListItem;
