import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const CategoryDashboard = () => {

    const navigation = useNavigation()
    // Category Items
    const [dashboard, setDashboard] = useState([
            { id: 1, title: "All",image:"" },
            { id: 2, title: "Electronics",image:"" },
            { id: 3, title: "Jewellery",image:"" },
            { id: 4, title: "Men",image:"" },
            { id: 5, title: "Women",image:"" },
            { id: 6, title: "Saved",image:"" },
        ]);

        console.log("Category dashboard Refreshed")

    return (
        <View>
            
            <FlatList
            data={dashboard}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>(
                <View style={{flex:1,justifyContent:'space-between'}}> 
                <TouchableOpacity
                style={{margin:5}}
                onPress={() => {
                    if(item.title == "All"){
            navigation.navigate('Shopping',{
              category : "All"
            });
          }else if(item.title == "Electronics"){
            navigation.navigate('Shopping',{
              category : "electronics"
            });
          }else if(item.title == "Jewellery"){
            navigation.navigate('Shopping',{
              category : "jewelery"
            });
          }else if(item.title == "Men"){
            navigation.navigate('Shopping',{
              category : "men's clothing"
            });
          }else if(item.title == "Women"){
            navigation.navigate('Shopping',{
              category : "women's clothing"
          })
        }
       }}
       >
            <View style={styles.categorybg}>
            {/* Category Title     */}
            <Text style={styles.categoryTitle} >{item.title}</Text>
            </View>

                </TouchableOpacity>
                </View>
            )}
            />
        </View>
    )
}

export default React.memo(CategoryDashboard);

const styles = StyleSheet.create({
  categorybg: {
    padding:10,
    backgroundColor: '#3D79B6',
    borderRadius: 10
  },

  categoryTitle : {
    color:'white',
    alignSelf:'center'
  }
})