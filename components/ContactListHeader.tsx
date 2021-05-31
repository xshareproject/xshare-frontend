import * as React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ContactListHeader extends React.Component{

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <Text style={styles.HeaderText}>
                        Contacts
                    </Text>
                    <Text style={styles.HeaderText}>
                        Groups
                    </Text>
                    <TouchableOpacity style={styles.addButton}
                        onPress={() => Alert.alert('add contacts')}>
                        <Text style={styles.buttonPlus}>
                            +
                        </Text>
                    </TouchableOpacity>
                    
                </View>
                
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch"
    },
    HeaderText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    Header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        top: 0
    },
    addButton: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 20/2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonPlus: {
        fontWeight: "bold",
        
    }
});