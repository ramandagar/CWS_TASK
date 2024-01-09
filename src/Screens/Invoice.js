// NewInvoiceScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import ClientCard from '../components/ClientCard';
import { selectInvoices } from '../store/Slices/invoicesSlice';
import { useSelector } from 'react-redux';


const InvoiceScreen = ({ navigation }) => {
    const [invoiceData, setInvoiceData] = useState({});
    const invoices = useSelector(selectInvoices);


    const handleInputChange = () => {

    }

    return (
        <View style={{ flex: 1, backgroundColor: '#d3d3d3' }}>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.searchInput}>
                    <Icon name="search" size={20} color="#333" />
                    <Text>Search</Text>
                </TouchableOpacity>
                <View style={{ width: 10 }} />
                <TouchableOpacity style={{
                    backgroundColor: '#00A36C',
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                    borderRadius: 10
                }}
                    onPress={() => navigation.navigate('NewInvoiceScreen')}
                >
                    <Text>New Invoice</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 15, marginTop: 10, height: '80%', backgroundColor: 'white', borderRadius: 10 }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#00A36C',
                    padding: 7,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                }}>
                    <Text style={{ color: 'white', fontSize: 17, fontWeight: '700' }}>Client</Text>
                    <Text style={{ color: 'white', fontSize: 17, fontWeight: '700' }}>Amount</Text>
                </View>
                <ScrollView>
                    {invoices.length !== 0 ? (
                        invoices.map((item) => <ClientCard key={item.id} item={item} />)
                    ) : (
                        <Text style={{textAlign:'center',marginTop:50,fontSize:20,color:'black',fontWeight:'600'}}>No invoices yet</Text>
                    )}
                </ScrollView>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 5 }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'orange', padding: 10, borderRadius: 10, width: '28%' }}>
                    <Icon name="archive" size={22} color="white" style={{ backgroundColor: 'orange' }} />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Export</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => navigation.navigate('NewInvoiceScreen')}
                 style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#00A36C', padding: 10, borderRadius: 10, width: '28%' }}>
                    <Icon name="add" size={22} color="white" />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Invoice</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = {
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 15
    },
    searchInput: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
};

export default InvoiceScreen;
