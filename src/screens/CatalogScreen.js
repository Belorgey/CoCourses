import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import DeptButton from '../components/atoms/DeptButton';
import MainTemplate from '../components/templates/MainTemplate';

import { AuthContext } from '../navigation/AuthProvider';
import { DatabaseContext } from '../navigation/DatabaseProvider';
import { Colors } from '../styles';

export default function CatalogScreen ( {navigation, route} ) {

  const { user } = useContext(AuthContext);
  const { getUser, addDepartment, departmentList, getDepartments, shop } = useContext(DatabaseContext);

  const [name,setName] = useState("");

  // const userId = route.params.userId;

  const handleNameChange=(textInput)=>{
    setName(textInput)
  }

  //read
  useEffect(() => {
    getUser(user.uid)
    if (shop !== null) {
      getDepartments(shop.shopId)
    }
  },[]);

  //write
  const writeToDatabase = () => {
    addDepartment(name,shop.shopId);
    setName("");
    alert("Rayon crée avec succés");
  }

  return (
    <MainTemplate>
      {(shop === null)
      ? 
       null
      :
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue au magasin {shop.name}</Text>
      </View>
      // <View>
      //   <FormInput
      //     value={name}
      //     placeholderText="Nom du rayon"
      //     onChangeText={handleNameChange}
      //     style={styles.input}
      //     key={"FormListName"}
      //   />
      //   <FormButton buttonTitle='Ajouter' onPress={writeToDatabase} key={"AddListButton"}/>
      // </View>
      }
      {(shop === null) 
      ? 
        <View>
          <Text>Mode hors magasin"</Text>
          <FormButton buttonTitle="Choisir un magasin" onPress={() => navigation.navigate("InOrOut")}/>
        </View>
      
      :
        departmentList.map((list) => (
          <View key={list.uuid}>
            {/* <Text style={styles.listName} key={"Name"+list.uuid}>{list.name}</Text> */}
            <DeptButton buttonTitle={list.name} onPress={() => navigation.navigate("Products",{deptId:list.uuid,userId:user.uid, deptName:list.name})} key={"Details"+list.uuid}/>
          </View>
        ))
      }
    </MainTemplate>
  );
}
  
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      marginTop:20
    },
    container: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
      fontSize: 28
    },
    title: {
      position: 'absolute',
      top:-170,
      color: Colors.ORANGE,
      fontWeight: "bold",
      fontSize: 31,
      textAlign:'center'
    },
  });