import * as React from 'react';
import { StyleSheet} from 'react-native';
import { Text, View } from '../components/Themed';
import { Button, Icon, Overlay } from 'react-native-elements';

interface HomeScreenState {
  transactionViewVisible: boolean
}
interface HomeScreenProps {

}

export default class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState>{
    constructor(props){
      super(props);
      this.state = {
        transactionViewVisible: false
      }
    }

    toggleNewTransaction(){
      this.setState({
        transactionViewVisible: !this.state.transactionViewVisible    
      });   
    }
    
    render(){
        return (
            <View style={styles.container}>
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

