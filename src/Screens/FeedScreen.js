import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectInvoices } from '../store/Slices/invoicesSlice';
import ClientCard from '../components/ClientCard';

const FeedComponent = () => {
    const invoices = useSelector(selectInvoices);

    return (
        <ScrollView>
            <View>
                {invoices?.length != 0 ? <>
                    <Text style={{ textAlign: 'center' }}>Your Invoices:</Text>
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
                        {invoices.map((item) => (
                            <ClientCard key={item.id} item={item} />
                        ))}
                    </View>
                </> : <Text style={{textAlign:'center',marginTop:50,fontSize:20,color:'black',fontWeight:'600'}}>No invoices yet</Text>}
            </View>
        </ScrollView>
    );

};

export default FeedComponent;
