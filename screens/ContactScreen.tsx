import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Linking, Button, Text, View, FlatList} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ContactListHeader from '../components/ContactListHeader';
import * as Contacts from 'expo-contacts';

export default function ContactScreen(){

  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName],
        sort: Contacts.SortTypes.FirstName
      });
      console.log(data[0]);
      setContacts(data);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [])


  //       if (status !== 'granted') {
  //             Linking.openURL('app-settings:');
  //             return;
  //           }

        return (
            <View style={styles.container}>
              <SafeAreaView />
              <ContactListHeader />
              <TextInput style={styles.input} 
                placeholder="Search"
                placeholderTextColor="#969696"

              />
              <FlatList style={styles.txt}
                data={contacts}
                renderItem={({ item }) => {
                return <Text style={styles.contact}>{item?.name}</Text>;
                }}>
  
              </FlatList>
            </View>
        );
    };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    input: {
      backgroundColor: '#ebebeb',
      color: '#969696',
      height: 38,
      width: 310,
      borderRadius: 7,
      padding: 10,
      marginTop: 20
    },
    txt: {
      width: "75%",
      marginLeft: 40,
      marginRight: 40,
      marginTop: 20,
    },
    contact: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 15
    }
    
  });

