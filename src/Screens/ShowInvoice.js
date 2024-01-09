import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'
import { addInvoice } from '../store/Slices/invoicesSlice'

const ShowInvoice = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { invoiceNo, email, invoiceDate, duedate, amount, discount } = route?.params?.formData
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, margin: 15, backgroundColor: 'white', borderRadius: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='account' size={25} style={{ backgroundColor: 'white', borderRadius: 50 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text>{invoiceNo}</Text>
                            <Text>{email}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ backgroundColor: "orange", padding: 3, borderRadius: 10 }}>{invoiceDate}</Text>
                        <Text style={{ backgroundColor: "orange", padding: 3, borderRadius: 10, marginTop: 3 }}>{duedate}</Text>
                    </View>
                    <View>
                        <Text>{amount ? amount : 0}</Text>
                    </View>
                </View>
                <View style={{ height: 1, width: '100%', backgroundColor: 'green' }} />
                <TouchableOpacity style={{ height: 50, justifyContent: 'center', alignSelf: 'flex-end', width: 100, margin: 15 }}>
                    <Text style={{ backgroundColor: 'orange', textAlign: 'center', borderRadius: 15, color: 'white', fontSize: 16, paddingVertical: 10 }}>Add</Text>
                </TouchableOpacity>
                <View style={{ height: 3, backgroundColor: 'orange', width: '100%' }} />
                <View style={{ margin: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                        <Text>SubTotal</Text>
                        <Text>{amount}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text>Discount</Text>
                        <Text>{discount}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                        <Text>Total</Text>
                        <Text></Text>
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: 'orange', padding: 15, borderRadius: 15, marginTop: 20 }}>
                    <Text style={{ textAlign: 'center' }}>Add Note & Terms</Text>
                </TouchableOpacity>
                <View style={{ height: 1, width: '100%', marginVertical: 100, backgroundColor: 'orange' }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity onPress={()=>{
                        dispatch(addInvoice(route?.params?.formData))
                        navigation.navigate('Invoice')
                    }} style={{ backgroundColor: '#50C878', width: 100, alignItems: 'center', padding: 10, borderRadius: 15 }}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={{ backgroundColor: 'gray', width: 100, alignItems: 'center', padding: 10, borderRadius: 15 }}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default ShowInvoice