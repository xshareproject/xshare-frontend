import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Route } from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';
import { TextInput, ScrollView} from 'react-native-gesture-handler';
import { NavigationProp} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {APP_PRIMARY_COLOR, APP_GRADIENT_COLOR} from '../assets/theme';

import { Text, View } from '../components/Themed';
import PaymentBreakdown from '../components/transactions/PaymentBreakdown';
import FieldInputWithLabel from '../components/FieldInputWithLabel';
import RecurrencePicker from '../components/transactions/RecurrencePicker';

import * as lodash from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Transaction } from '../redux/types/types.Transaction';
import { updateTransaction, updateTransactionType } from '../redux/transaction/transaction.actions';
import DateInputWithLabel from '../components/DateInputWithLabel';

interface DispatchProps {
    updateTransaction: Function,
    updateTransactionType: typeof actions.updateTransactionType,    
}

interface TransactionDetailsProps extends DispatchProps {
    navigation: NavigationProp<any>,
    updateTransaction: Function,
    updateTransactionType: typeof actions.updateTransactionType;
    route: Route;
}

interface TransactionDetailsState {
    editedTransaction: Transaction,
    editable: boolean,
    displaySavePrompt: boolean,
    saveChanges: boolean,
    transactionType: TRANSACTION_TYPE
}


const actions = {
    updateTransactionType: (transactionType: TRANSACTION_TYPE, transactionId: Transaction) : any => true,
}


enum TRANSACTION_TYPE{
    STANDARD, MEAL, RECURRING
}

export class TransactionDetailsScreen extends React.Component<TransactionDetailsProps, TransactionDetailsState>{
    constructor (props: TransactionDetailsProps, context: any){
        super(props, context);
        this.state = {
            editedTransaction : lodash.cloneDeep(this.props.route.params),
            editable: false,
            displaySavePrompt: false,
            saveChanges: false,
            transactionType: TRANSACTION_TYPE.STANDARD,
        };
    };

    updateEditedTransaction = (propertyName: string, value: any) => {
        let editedTransaction :  Transaction = this.state.editedTransaction;
        editedTransaction[propertyName] = value;
        this.setState({
            editedTransaction
        });
    }

    handleButtonClick = () => {
        this.setState({editable: !this.state.editable}, 
            () => {
                if(!this.state.editable){
                    this.setState({
                        displaySavePrompt: !this.state.displaySavePrompt
                    })
                }        
            });    
    }

    toggleOverlay = () => {
        this.setState({
            displaySavePrompt: !this.state.displaySavePrompt
        });
    }

    saveChanges = () => {
        this.props.updateTransaction(this.state.editedTransaction);
        this.setState({
            saveChanges: true,
            displaySavePrompt: false
        }); 
    }

    cancelChanges = () => {
        this.setState({
            saveChanges: false,
            displaySavePrompt: false,
            editedTransaction: this.props.route.params
        });
    }
    
    render() {
        let displaySaveOverlay = <Overlay isVisible={this.state.displaySavePrompt} onBackdropPress={() => this.toggleOverlay()}>
            <View>
                <Text>Save changes?</Text>
                <View style={{flexDirection: 'row'}}>
                    <Button title="Save" 
                    onPress={() => this.saveChanges()}/>
                    <Button title="Cancel"
                    onPress={() => this.cancelChanges()}/>
                </View>
            </View>
        </Overlay>

        return (
                <React.Fragment>
                    {displaySaveOverlay}
                    <View style={styles.topBar}>
                        <View style={{flexDirection: "row", backgroundColor: APP_PRIMARY_COLOR, alignSelf: 'center'}}>
                            <Text style={{textAlign: 'center'}}>Created by you on {this.state.editedTransaction.createdDate} </Text>
                            <Icon
                                name='pencil'
                                type='entypo'
                                size={20}
                                color="black"
                                onPress={() => this.handleButtonClick()}
                            />  
                        </View>
                        <View style={{flexDirection: "row", backgroundColor: APP_PRIMARY_COLOR, alignSelf: 'center'}}>
                            <Icon
                                name='checkcircleo'
                                type='antdesign'
                                size={20}
                                containerStyle={{alignSelf: 'center', paddingHorizontal: 2}}
                            />
                            <Text style={{fontSize: 20, textAlign: 'center'}}>{this.state.editedTransaction.transactionName}</Text>
                        </View>
                    </View>

                    <RNPickerSelect
                    style={pickerStyle}
                    disabled={!this.state.editable}
                    items={[
                        {label: 'Standard Transaction', value: TRANSACTION_TYPE.STANDARD},
                        {label: 'Meal Transaction', value: TRANSACTION_TYPE.MEAL},
                        {label: 'Recurring Transcation', value: TRANSACTION_TYPE.RECURRING}
                    ]}
                    onValueChange={(value) => {
                        if (value !== null)
                            updateTransactionType(value, this.state.editedTransaction);
                    }}
                    placeholder={{label: 'Choose Transaction Mode', value: null}}
                    />

                    <ScrollView style={styles.container}>
                        <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'height' : 'position'}>
                            <DateInputWithLabel currentObject={this.state.editedTransaction} property="paymentDate" label="PAYMENT DEADLINE" editable={this.state.editable} 
                                                onChangeCallback={this.updateEditedTransaction} inputStyle = {styles.inputField} labelStyle={styles.labelField}/>                            
                            <FieldInputWithLabel currentObject={this.state.editedTransaction} property="note" label="NOTE" editable={this.state.editable} 
                                                onChangeCallback={this.updateEditedTransaction} inputStyle = {styles.inputField} labelStyle={styles.labelField}/>                            
                            <PaymentBreakdown currentTransaction={this.state.editedTransaction} editable={this.state.editable} updateContacts={this.state.saveChanges}></PaymentBreakdown>
                            <Text style={this.state.transactionType === TRANSACTION_TYPE.MEAL ? null : {display: 'none'}}>Tax: 12%, Tips: 5%</Text>
                            <Button title={"Recurring Details"} titleStyle={{color: 'black'}} containerStyle={this.state.transactionType === TRANSACTION_TYPE.RECURRING ? null : {display: 'none'}}/>
                            <FieldInputWithLabel currentObject={this.state.editedTransaction} property="totalAmount" label="TOTAL AMOUNT" editable={this.state.editable} 
                                                onChangeCallback={this.updateEditedTransaction} inputStyle = {styles.inputField} labelStyle={styles.labelField}/>        
                            <RecurrencePicker></RecurrencePicker>
                            <Button title={"Complete Payment"} titleStyle={{color: 'black'}} buttonStyle={{backgroundColor: APP_PRIMARY_COLOR}}/>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        backgroundColor: APP_PRIMARY_COLOR, 
        flex: .2,
        flexDirection: 'column',
        paddingTop: 50
    },
    labelField: {
      borderBottomWidth: 1
    },
    inputField: {
        paddingLeft: 5, 
        backgroundColor: '#ffffff', 
        flex: 1,
        borderBottomWidth: 1
    }
});

const pickerStyle = StyleSheet.create({
    inputAndroid: {
        paddingLeft: 100,
        width: 200,
    },
    inputIOS: {
        paddingLeft: 100,   
        width: 200,
    },
})

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateTransaction: (transaction : Transaction) => dispatch(updateTransaction(transaction)),
        // updateTransactionType: (transactionType, transactionId) => dispatch(updateTransactionType(transactionType, transactionId)),
    }
}

export default connect(null, mapDispatchToProps)(TransactionDetailsScreen);

