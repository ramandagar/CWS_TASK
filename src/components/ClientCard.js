import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ClientCard = ({item}) => {
    console.log('item is here',item)
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7,backgroundColor: '#FFB6C1',alignItems:'center' }}>
                <View style={{ flexDirection: 'row',alignItems:'center'}}>
                    <Icon name='account' size={25} style={{backgroundColor:'white',borderRadius:50}}/>
                    <View style={{marginLeft:10}}>
                        <Text>{item?.invoiceNo}</Text>
                        <Text>{item?.email}</Text>
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={{backgroundColor:"orange",padding:3,borderRadius:10}}>{item?.invoiceDate}</Text>
                    <Text style={{backgroundColor:"orange",padding:3,borderRadius:10,marginTop:3}}>{item?.duedate}</Text>
                </View>
                <View>
                    <Text>{item?.amount}</Text>
                </View>
            </View>
            <View style={{height:1,width:'100%',backgroundColor:'green'}}/>
          </>
        
    )
}

export default ClientCard