import React, { useEffect, useState } from "react"
import { View,Text,Button,TouchableOpacity, StyleSheet, TextInput, Alert,Image } from "react-native"
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const AddProductScreen = () => {

    const [title,setTitle] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [imageUri, setImageUri] = useState('')
    const url = 'https://fakestoreapi.com/products'
    const randomNumber = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    const [submit, setSubmit] = useState(false)

    const openCamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync()
        if(!permission.granted){
            Alert.alert("Camera Permission is required")
            return;
        }

        const result = await ImagePicker.launchCameraAsync({quality:1})

        if(!result.canceled){
            setImageUri(result.assets[0].uri);
        }
    }
    
    useEffect(() => {

        if(submit){

        axios.post(url,{
            randomNumber,
            title,
            price,
            description,
            category,
            imageUri
        })
        .then((response) => {
            console.log("The response is " + JSON.stringify(response.data))     
        })
        .catch((error) => {
            console.log("Error is " + error)
        })
    }
    },[submit])

    return(
        <View style={{backgroundColor:'#f2f2fc',height:'100%'}}>
            <Text
            style={styles.addText}
            >Add your own custom product and become a seller</Text>

            {/* Add a Title */}
            <TitleAndInput
            title="Add a Title"
            hint = "Enter your title"
            onChangeText={(text) => setTitle(text)}
            />

            {/* Add a Price */}
            <TitleAndInput
            title="Add a Price"
            hint = "Enter your price"
            onChangeText={(text) => setPrice(text)}
            />

            {/* Add a Description */}
            <TitleAndInput
            title="Add a Description"
            hint = "Enter your description" 
            onChangeText={(text) => setDescription(text)}
            />

            {/* Add a Category */}
            <TitleAndInput
            title="Add a Category"
            hint = "Enter your Category"
            onChangeText={(text) => setCategory(text)}
            />

            {/* Open a Camera */}
            <Text style={styles.titleText}>Add a image</Text>
            <TouchableOpacity style={styles.addImgbtn}
            onPress={() => {
                openCamera()
            }}
            >
                <Text style={styles.addImgtext}>
                    Add a Image
                </Text>
            </TouchableOpacity>

            {/* Displaying Image */}
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

            {/* Submitting a Product */}
            <TouchableOpacity style={styles.submitBtn} onPress={() => {
                setSubmit(true)
            }}>
                <Text style={styles.submitText}>
                    Submit Your Product
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default AddProductScreen;

// Title and TextInput
const TitleAndInput = (props) => {

    return(
        <View>
      
            <Text style={styles.titleText}>{props.title}</Text>
            
            <TextInput
            style={styles.inputText}
            placeholder={props.hint}
            onChangeText={props.onChangeText}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    addText : {
        fontSize:17,
        fontWeight:'600',
        marginLeft:10,
        marginTop:10,
        marginRight:10,
        color:'#004a8e'
    },

    titleText:{
        marginLeft:10,
        marginTop:10,
        fontWeight:15,
        fontWeight:'500'
    },

    inputText : {
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'white',
        padding:10,
        borderRadius:10
    },

    addImgbtn : {
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        borderRadius:15,
        backgroundColor:'#004a8e'
    },

    addImgtext : {
        alignSelf:'center',
        fontWeight:'600',
        color:'white',
        padding:10
    },

    image:{
        width:80,
        height:80,
        marginTop:10,
        marginLeft:20
    },

    submitBtn : {
        backgroundColor:'green',
        borderRadius:20,
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        marginBottom:10
    },

    submitText : {
        fontWeight:'600',
        fontSize:15,
        padding:10,
        color:'white',
        alignSelf:'center',
    }
})