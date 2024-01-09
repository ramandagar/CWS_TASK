import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from '@react-native-community/datetimepicker';
import * as Yup from 'yup';

// Yup validation schema
const validationSchema = Yup.object().shape({
    invoiceNo: Yup.string().required('Invoice No is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    
    discountType: Yup.string().required('Discount Type is required'),
    discount: Yup.number().required('Discount is required'),

    currencies: Yup.string().required('Currencies is required'),
    product: Yup.string().required('Product is required'),
    amount: Yup.number().required('Amount is required'),
    unitprice: Yup.number().required('Unit Price is required'),
    quantity: Yup.number().required('Quantity is required'),
    invoiceDate: Yup.date().required('Invoice Date is required'),
    duedate: Yup.date().required('Due Date is required'),


  });
  
  const CustomTextInput = ({ type, label, placeholder, value, onChangeText, secureTextEntry = false, onFocus, onIconPress }) => {
    return (
      <View style={styles.inputContainer}>
        <Text style={{
          marginLeft: 7,
          fontSize: 15,
          color: 'black',
          fontWeight: '500',
          marginVertical: 6
        }}>{label}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          type={type}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
        />
      </View>
    );
  };
  
  const CustomForm = () => {
    const navigation = useNavigation();
  
    const [formData, setFormData] = useState({
      name:'',
      email: '',
      invoiceDate: '',
      discountType: '',
      discount: '',
      duedate: '',
      currencies: '',
      product: '',
      quantity: '',
      unitprice: '',
      tax: '',
      amount: '',
      invoiceNo: '',
    });
  
    const [showInvoiceDatePicker, setShowInvoiceDatePicker] = useState(false);
    const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  
    const handleInputChange = (fieldName, value) => {
      setFormData({ ...formData, [fieldName]: value });
    };
  
    const handleDateChange = (fieldName, date) => {
      setFormData({ ...formData, [fieldName]: date.toISOString().split('T')[0] });
    };
  
    const showInvoiceDatePickerHandler = () => {
      setShowInvoiceDatePicker(true);
    };
  
    const showDueDatePickerHandler = () => {
      setShowDueDatePicker(true);
    };
  
    const handleSubmit = async () => {
      try {
        await validationSchema.validate(formData, { abortEarly: false });
        console.log('Form Data:', formData);
        navigation.navigate('ShowInvoice',
        {
            formData:formData
        })
       } catch (error) {
        const errorMessage = error.errors.join('\n');
        Alert.alert('Validation Error', errorMessage);
      }
    };
  
    useLayoutEffect(() => {
      navigation.setOptions({
        title: "New Invoice",
        headerStyle: {
          backgroundColor: '#DCDCDC',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: { color: 'black' },
        headerTitleAlign: 'center',
        headerRight: () => (
          <TouchableOpacity>
            <Icon name='filter-menu-outline' size={25} color="white" style={{ backgroundColor: 'orange', padding: 4, borderRadius: 10 }} />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <View>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Icon name='arrow-left' size={25} color="white" style={{ backgroundColor: '#00A36C', padding: 4, borderRadius: 10 }} />
            </TouchableOpacity>
          </View>
        )
      });
    }, []);
  
    return (
      <View style={styles.container}>
        <View style={{
          flex: 1, backgroundColor: 'white',
          padding: 15,
          borderRadius: 10,
          marginVertical: 20
        }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomTextInput
              placeholder="Invoice No"
              value={formData.invoiceNo}
              label="Invoice No"
              onChangeText={(text) => handleInputChange('invoiceNo', text)}
            />
             <CustomTextInput
              placeholder="Client Name"
              value={formData.name}
              label="Client Name"
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <CustomTextInput
              placeholder="Client Email"
              value={formData.email}
              label="Client Email"
              type="email"
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
            <CustomTextInput
              placeholder="Invoice Date"
              value={formData.invoiceDate}
              label="Invoice Date"
              onFocus={showInvoiceDatePickerHandler}
            />
            {showInvoiceDatePicker && (
              <DatePicker
                value={formData.invoiceDate ? new Date(formData.invoiceDate) : new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setShowInvoiceDatePicker(false);
                  if (selectedDate) {
                    handleDateChange('invoiceDate', selectedDate);
                  }
                }}
              />
            )}
            <CustomTextInput
              placeholder="Discount Type"
              value={formData.discountType}
              label="Discount Type"
              onChangeText={(text) => handleInputChange('discountType', text)}
            />
            <CustomTextInput
              placeholder="Discount"
              value={formData.discount}
              label="Discount"
              onChangeText={(text) => handleInputChange('discount', text)}
            />
            <CustomTextInput
              placeholder="Due Date"
              value={formData.duedate}
              label="Due Date"
              onFocus={showDueDatePickerHandler}
            />
            {showDueDatePicker && (
              <DatePicker
                value={formData.duedate ? new Date(formData.duedate) : new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDueDatePicker(false);
                  if (selectedDate) {
                    handleDateChange('duedate', selectedDate);
                  }
                }}
              />
            )}
            <CustomTextInput
              placeholder="Currencies"
              value={formData.currencies}
              label="Currencies"
              onChangeText={(text) => handleInputChange('currencies', text)}
            />
            <CustomTextInput
              placeholder="Product"
              value={formData.product}
              label="Product"
              onChangeText={(text) => handleInputChange('product', text)}
            />
             <CustomTextInput
              placeholder="Quantity"
              value={formData.quantity}
              label="Quantity"
              onChangeText={(text) => handleInputChange('quantity', text)}
            />
             <CustomTextInput
              placeholder="Unitprice"
              value={formData.unitprice}
              label="Unitprice"
              onChangeText={(text) => handleInputChange('unitprice', text)}
            />
             <CustomTextInput
              placeholder="Amount"
              value={formData.amount}
              label="Amount"
              onChangeText={(text) => handleInputChange('amount', text)}
            />
          </ScrollView>
          <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', justifyContent: 'space-evenly', marginTop: 15 }}>
            <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#00A36C', width: '40%', alignItems: 'center', paddingVertical: 10, borderRadius: 10 }}>
              <Text style={{ fontSize: 16, color: 'white' }}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{ backgroundColor: 'gray', borderRadius: 10, width: '40%', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#DCDCDC',
      elevation: 2,
      shadowOpacity: 2
    },
    inputContainer: {
      marginBottom: 10,
    },
    input: {
      height: 40,
      paddingHorizontal: 15,
      backgroundColor: '#DCDCDC',
      borderRadius: 15
    },
  });
  
  export default CustomForm;