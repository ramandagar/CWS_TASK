import React, { useState, useEffect,useCallback } from 'react';
import { View, FlatList } from 'react-native';
import axios from 'axios';
import ProductItem from '../components/Producttem';
import Loader from './Common/Loader';
import Error from './Common/Error';
import SearchBar from '../components/Search';

const ProductList = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = useCallback((searchText = '') => {
    setLoading(true);
    axios.get(`https://dummyjson.com/products?q=${searchText}`)
      .then(response => {
        const newProducts = response.data.products.map(item => ({
          ...item,
          key: item.id.toString(),
        }));
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
        setPage(page + 1);
      })
      .catch(error => {
        console.error(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const navigateToDetail = useCallback((product) => {
    navigation.navigate('ProductDetail', { product });
  }, [navigation]);

  const renderProductItem = useCallback(({ item }) => (
    <ProductItem item={item} onPress={() => navigateToDetail(item)} />
  ), [navigateToDetail]);

  const renderFooter = useCallback(() => {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return <Error message="Error loading data. Please try again." />;
    } else {
      return null;
    }
  }, [loading, error]);

  const handleEndReached = useCallback(() => {
    if (!loading && !error) {
      fetchProducts();
    }
  }, [loading, error, fetchProducts]);

  const handleSearch = useCallback((searchText) => {
    setProducts([]);  
    setPage(1); 
    fetchProducts(searchText);
  }, [fetchProducts]);

  return (
    <View>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderProductItem}
        numColumns={2}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default ProductList;