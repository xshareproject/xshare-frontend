import * as React from 'react';
import { StyleSheet} from 'react-native';
import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';


export default class RegistrationScreen extends React.Component{
    
    render(){
        return (
            <View style={styles.container}>
                <Text>Welcome to Share</Text>
                <Text>Create an Account</Text>
              <TextInput placeholder="Full Name"></TextInput>
              <TextInput placeholder="Username"></TextInput>
              <TextInput placeholder="Password"></TextInput>
              <TextInput placeholder="Email"></TextInput>
              <TextInput placeholder="Phone Number"></TextInput>
              <Button>Next</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

});

