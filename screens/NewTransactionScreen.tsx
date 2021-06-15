import * as React from 'react';
import {StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Route} from 'react-native';
import { NavigationProp} from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { Button, Icon, Overlay } from 'react-native-elements';
import { TextInput, ScrollView} from 'react-native-gesture-handler';
import FieldInputWithLabel from '../components/FieldInputWithLabel';
import { PaymentBreakdown, RecurrencePicker } from '../components/transactions/index';
import RNPickerSelect from 'react-native-picker-select';
import {APP_PRIMARY_COLOR, APP_SECONDARY_COLOR} from '../assets/theme';
import { TRANSACTION_TYPE, Transaction } from '../redux/types/types.Transaction';
import { formatDate } from '../utility/utility';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createTransaction, defaultTransaction } from '../redux/transaction/transaction.actions';
import axios from 'axios';

interface NewTransactionProps {
  createTransaction: Function,
  navigation: NavigationProp<any>
}

function NewTransactionScreen(props: NewTransactionProps) {
  let currentDate = new Date();
  let paymentDate = new Date();
  paymentDate.setMonth(currentDate.getMonth() + 1);

  var testTransaction : Transaction = {
    id: "6f29fcaa-25f6-40a2-9976-be1b3ed6a30e",
    lenderId: "0wn3r1e-1578-4be5-87eb-e9211fedd90f",
    transactionName: "testTransaction",
    note: "",
    totalAmount: 0,
    createdDate: formatDate(currentDate),
    paymentDate: formatDate(paymentDate),
    recurring: false,
    recurringId: "",
    groupId: "",
    transactionType: TRANSACTION_TYPE.STANDARD 
  };

  const [submitTransaction, setSubmitTransaction] = React.useState(false);
  const [newTransaction, setNewTransaction] = React.useState(testTransaction);

  function updateTransaction(property: string, value: any){
      var updatedTransaction = newTransaction;
      if(property == 'paymentDate'){
        updatedTransaction[property] = formatDate(value);
      } else {
        updatedTransaction[property] = value;
      }
      setNewTransaction(
          updatedTransaction
      );    
  }

  async function onSubmitTransaction(){
    await props.createTransaction(newTransaction);
    setSubmitTransaction(true);
    props.navigation.navigate('Transactions', {screen: 'Overview'});
  }

  return (
    <React.Fragment>
        <ScrollView style={{flex: 1, width: '80%', alignSelf: 'center'}}>
            <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'position'}>
                <View style={{paddingTop: 20}}></View>
                <PaymentBreakdown currentTransaction={newTransaction} editable={true} updateContacts={submitTransaction}></PaymentBreakdown>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <FieldInputWithLabel currentObject={newTransaction} property="totalAmount" label="TOTAL AMOUNT" editable={true} valueType="number" onChangeCallback={updateTransaction}/>        
                <FieldInputWithLabel currentObject={newTransaction} property="note" label="NOTE" editable={true} onChangeCallback={updateTransaction}/>                            
                <FieldInputWithLabel currentObject={newTransaction} property="paymentDate" label="PAYMENT DEADLINE" editable={true} onChangeCallback={updateTransaction}/>               
                <Button title={"Attach Receipt"} titleStyle={{color: 'white'}} buttonStyle={{backgroundColor: APP_SECONDARY_COLOR, marginVertical: 10}}/>              
                <Button title={"Confirm"} titleStyle={{color: 'black'}} buttonStyle={{backgroundColor: APP_PRIMARY_COLOR}} onPress={onSubmitTransaction}/>
            </KeyboardAvoidingView>
        </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
  topBar: {
    backgroundColor: APP_PRIMARY_COLOR, 
    flex: .2,
    flexDirection: 'column',
  },
  inputContainer: {
      flexDirection: "row",
      paddingVertical: 15,
      borderTopWidth: 1,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  function asyncPostTranction(transaction: Transaction){
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(
          (res) => {console.log('API Post succeeded'); dispatch(createTransaction(transaction))},
          (err) => dispatch(defaultTransaction())
        );
  }

  return {
      createTransaction: (transaction: Transaction) => asyncPostTranction(transaction)
  }
}

export default connect(null, mapDispatchToProps)(NewTransactionScreen);

