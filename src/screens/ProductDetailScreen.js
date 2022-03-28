import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert, Image,  StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import PlusButton from '../components/atoms/PlusButton';
import AddProductModal from '../components/molecules/AddProductModal';
import MainTemplate from '../components/templates/MainTemplate';

import { DatabaseContext } from '../navigation/DatabaseProvider';
import { StorageContext } from '../navigation/StorageProvider';

import { windowWidth, windowHeight } from "../styles/index";

export default function ProductDetailScreen ( {navigation, route} ) {
  
    const { deleteItem, item, getItem, updateItem } = useContext(DatabaseContext);
    const { getImage, imageUrl } = useContext(StorageContext);
    
    const [text,setText] = useState();
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [onEdit,setOnEdit] = useState(null);

    const productId = route.params.productId;
    const deptId = route.params.deptId;
    const userId = route.params.userId;
  
    const handleTextChange=(textInput)=>{
      setText(textInput)
    }
    const handleNameChange=(textInput)=>{
      setName(textInput)
    }
    const handlePriceChange=(textInput)=>{
      setPrice(textInput)
    }
  
    //read
    useEffect(() => {
      getItem(productId)
      getImage(productId)
    },[]);

    //delete
    const handleListDelete = async (list) => {
      deleteItem(list.uuid);
      navigation.navigate("Products",{deptId:deptId});
    }
  
    //update
    const handleListSubmitChange = () => {
      updateItem(productId,name,text);
      setOnEdit(null);
      setText("");
    }

  return (
    <MainTemplate>
        {onEdit !== null ?
            <View>
              <FormInput
                value={name}
                defaultValue={onEdit.name}
                onChangeText={handleNameChange}
                style={styles.input}
                key={"Name"}
              />
              <FormInput
                value={text}
                defaultValue={onEdit.text}
                onChangeText={handleTextChange}
                style={styles.input}
                key={"Text"}
              />
              <FormButton buttonTitle='Ecraser' onPress={handleListSubmitChange} key={"Save"}/>
              <FormButton buttonTitle='X' onPress={() => setOnEdit(null)} key={"Cancel"} />
            </View>
            : null
        }
      {(item === null) ? <View></View> : item.map((list) => (
        <View key={list.uuid}>
          {(imageUrl===null) ? null :<Image style={{width:windowWidth,height:200}} source={{uri : imageUrl}} />}
          <Text style={styles.listName} key={"Name"+list.uuid}>{list.name}</Text>
          <Text key={"Text"+list.uuid} style={styles.listDesc}>{list.text}</Text>
          {/* <FormButton buttonTitle='Supprimer' onPress={() => handleListDelete(list)} key={"delete"+list.uuid}/> */}
          {/* <FormButton buttonTitle='Modifier' onPress={() => setOnEdit(list)} key={"update"+list.uuid}/> */}
          {/* <FormButton buttonTitle='Ajouter' onPress={() => navigation.navigate("ListsChoice",{itemName:list.name,itemId:list.uuid,userId:userId,deptId:deptId})} key={"add"+list.uuid}/> */}
          {/* <PlusButton onPress={() => navigation.navigate("ListsChoice",{itemName:list.name,itemId:list.uuid,userId:userId,deptId:deptId})} key={"add"+list.uuid}/> */}
          // <AddProductModal itemName={list.name} deptId={deptId} itemId={list.uuid} />
          <AddProductModal itemId={list.uuid} itemName={list.name} userId={userId} deptId={deptId} />
        </View>
      ))}
    </MainTemplate>
  );
}
  
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      marginTop:20
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:0
    },
    input: {
      padding:10,
      borderWidth:1,
      borderColor:'#CCC',
      width:'90%',
      marginBottom:1,
      borderRadius:5
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    listName: {
      fontSize: 28,
      top:50
    },
    listDesc: {
      top:70
    },
    containerModal: {
      position:'absolute',
      zIndex:2
    }
  });