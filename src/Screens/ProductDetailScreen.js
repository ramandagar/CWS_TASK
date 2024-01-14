import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList,ToastAndroid  } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store.js/slices/CartSlice';

const ProductDetail = ({ route, navigation }) => {
    const { product } = route.params;
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const flatListRef = useRef(null);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/category/smartphones`);
                setRelatedProducts(response.data);
                console.log('response.data', response.data);
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        fetchRelatedProducts();
    }, [product]);

    const handleQuantityChange = (value) => {
        const newQuantity = Math.max(1, value);
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ product, quantity }));
        ToastAndroid.showWithGravity(
            `${quantity} ${product.title} added to cart`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
    };



    const renderRelatedProductItem = ({ item }) => (
        <TouchableOpacity style={styles.relatedProductItem} onPress={() => navigateToDetail(item)}>
            <Image source={{ uri: item.thumbnail }} style={styles.relatedProductImage} />
            <Text style={styles.relatedProductTitle}>{item.title}</Text>
            <Text style={styles.relatedProductPrice}>${item.price}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Icon name='star' size={20} color="#57e32c" />
                <Text>{item.rating}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderProductImage = ({ item, index }) => (
        <Image source={{ uri: item }} style={styles.productImage} />
    );

    const navigateToDetail = (relatedProduct) => {
        navigation.push('ProductDetail', { product: relatedProduct });
    };


    const renderPaginationDots = () => (
        <View style={styles.paginationContainer}>
            {product.images.map((_, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.paginationDot, index === activeIndex && styles.activeDot]}
                />
            ))}
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const index = Math.ceil(
                        Math.ceil(event.nativeEvent.contentOffset.x) /
                        Math.ceil(event.nativeEvent.layoutMeasurement.width)
                    );
                    setActiveIndex(index)
                }}
            >
                <FlatList
                    ref={flatListRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={product.images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderProductImage}
                />
            </ScrollView>
            {renderPaginationDots()}
            <View style={styles.detailsContainer}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <View style={styles.quantityContainer}>
                    <Text style={styles.quantityText}>Quantity:</Text>
                    <View style={styles.quantityControl}>
                        <TouchableOpacity onPress={() => handleQuantityChange(quantity - 1)}>
                            <Icon name="remove" size={20} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.quantityValue}>{quantity}</Text>
                        <TouchableOpacity onPress={() => handleQuantityChange(quantity + 1)}>
                            <Icon name="add" size={20} color="#333" />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.buttonContainer,{width:'80%'}]}>
                        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                            <Text style={styles.buttonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            {relatedProducts.length > 0 && (
                <View style={styles.relatedProductsContainer}>
                    <Text style={styles.relatedProductsTitle}>Related Products</Text>
                    <FlatList
                        data={relatedProducts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderRelatedProductItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}
            {relatedProducts?.products?.length > 0 && (
                <View style={styles.relatedProductsContainer}>
                    <Text style={styles.relatedProductsTitle}>Related Products</Text>
                    <FlatList
                        data={relatedProducts?.products}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderRelatedProductItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    productImage: {
        width: 300,
        height: 250,
        resizeMode: 'cover',
        margin: 20,
        borderRadius: 20
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityText: {
        fontSize: 16,
        marginRight: 10,
        color: '#333',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityValue: {
        fontSize: 18,
        marginHorizontal: 10,
        color: '#333',
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        elevation: 3,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    productPrice: {
        fontSize: 20,
        color: '#4CAF50',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    relatedProductsContainer: {
        marginVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    relatedProductsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
        color: '#333',
    },
    relatedProductItem: {
        marginRight: 10,
        width: 150,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        padding: 10,
        elevation: 3,
    },
    relatedProductImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    relatedProductTitle: {
        fontSize: 14,
        marginTop: 5,
        color: '#333',
    },
    relatedProductPrice: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#888',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#4CAF50',
        width: 25
    },
});

export default ProductDetail;
