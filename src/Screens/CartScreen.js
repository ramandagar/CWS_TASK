import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addQuantity, removeQuantity, removeFromCart } from '../store.js/slices/CartSlice';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleAddQuantity = (id) => {
    dispatch(addQuantity({ id }));
  };

  const handleRemoveQuantity = (id) => {
    dispatch(removeQuantity({ id }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.product.thumbnail }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.productTitle}>{item.product.title}</Text>
        <Text style={styles.productPrice}>Price: ${item.product.price}</Text>
        <Text>Quantity: {item.quantity}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddQuantity(item.product.id)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveQuantity(item.product.id)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.rmvbtn} onPress={() => handleRemoveFromCart(item.product.id)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.product.id.toString()}
            renderItem={renderItem}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Items: {totalItems}</Text>
            <Text style={styles.totalText}>Total Amount: ${totalAmount.toFixed(2)}</Text>
          </View>
        </>
      ) : (
        <View style={[styles.cartItem, { justifyContent: 'center', height: 400 }]}>
          <Text style={{
            fontSize: 25, textAlign: 'center', fontFamily: 'Quicksand-Regular',
            fontWeight:'800'
          }}>Your cart is empty</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 15,
    color: '#888',
    marginBottom: 5,
    fontWeight: 'semi-bold'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rmvbtn:{
    width:100,
    backgroundColor:'red',
    padding:10,
    alignItems:'center',
    borderRadius:20
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    width: 50,
    marginTop: 10
  },
  removeButton: {
    backgroundColor: '#ff3333',
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    marginTop: 10,
    width: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    elevation: 3,
    alignItems:'center'
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'semi-bold',
    marginBottom: 5,
  },
});

export default CartScreen;
