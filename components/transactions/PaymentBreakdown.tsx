import * as React from 'react';
import { SearchBar, ListItem, Button, Icon, Overlay } from 'react-native-elements';
import {View} from '../Themed';
import {StyleSheet, Text, FlatList} from 'react-native';
import { TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {Contact} from '../../redux/types/types.Contact';
import { TransactionStatus, PaymentStatus } from '../../redux/types/types.TransactionStatus';
import {AppState} from '../../redux/root-reducer';
import {Dispatch} from 'redux';
import { Transaction } from '../../redux/types/types.Transaction';
import { addMultipleTransactionStatus, editTransactionStatusAmount, removeTransactionStatus, removeTransactionStatusByTransactionId } from '../../redux/transactionStatus/transactionStatus.action';
import _ from 'lodash';

interface StateProps {
    contactTransactionPairs: TransactionStatus[],
    contacts: Contact[]
}

interface DispatchProps {
    addMultipleTransactionStatuses: Function,
    removeStatusFromTransaction: Function,
    removeStatusesByTransactionId: Function,
    editAmount: Function 
}

interface ParentComponentProps {
    currentTransaction: Transaction,
    editable: boolean,
    updateContacts: boolean,
}

interface PaymentBreakdownProps extends StateProps, DispatchProps, ParentComponentProps {}

interface PaymentBreakdownState{
    search: string,
    searchResultList: Contact[],
    transactionStatuses: (TransactionStatus)[],
    contactViewVisible: boolean,
    editable: boolean,
    updateContacts: boolean,
}

class PaymentBreakdown extends React.Component<PaymentBreakdownProps, PaymentBreakdownState> {
    constructor(props : PaymentBreakdownProps){
        super(props);
        this.state = {
          search: "",
          searchResultList: [], 
          transactionStatuses: [],
          contactViewVisible: false,
          editable: this.props.editable,
          updateContacts: this.props.updateContacts,
        };
    }

    componentDidMount(){
        this.setState({
            transactionStatuses: _.cloneDeep(this.props.contactTransactionPairs)
        })
    }

    updateSearch = (search : string) => {
        this.setState({ search }, () => {
            this.setState({
                searchResultList: this.state.search === "" ? [] : this.getContactByName(search)
            })
        });
    }

    getContactByName = (name: string) => {
        return this.props.contacts.filter((contact : Contact) => {return contact.name.includes(name)} );
    }

    addStatusToTransaction = (contact : Contact) => {
        let transactionId = this.props.currentTransaction.id;
        let newTransactionStatus : TransactionStatus = {
            id: "",
            transactionId,
            lenderId: contact.ownerId,
            borrowerId: contact.id,
            paymentStatus: PaymentStatus.Pending,
            amountOwned: 0
        };
        let contactTransactionPairList = this.state.transactionStatuses;
        contactTransactionPairList.push(newTransactionStatus);
        this.setState({
            transactionStatuses: contactTransactionPairList
        }); 
    }

    removeStatusFromTransaction = (contactId: string) => {
        let contactTransactionPairList = this.state.transactionStatuses;
        let indexToRemove = contactTransactionPairList.findIndex((contactTransactionPair) => {return contactTransactionPair?.borrowerId === contactId});
        contactTransactionPairList.splice(indexToRemove, 1);
        this.setState({
            transactionStatuses: contactTransactionPairList
        });
    }

    editAmount = (contactId : string, amount: string) => {
        let amountNum = parseFloat(amount);
        let indexToModify = this.state.transactionStatuses.findIndex((contactTransactionPair) => {return contactTransactionPair?.borrowerId === contactId});
        let transactionStatuses = this.state.transactionStatuses;
        transactionStatuses[indexToModify]["amountOwned"] = amountNum;
        this.setState({
            transactionStatuses
        });
    }

    toggleContactView = () => {
        this.setState({
            contactViewVisible: !this.state.contactViewVisible
        });
    }

    componentDidUpdate = () => {
        if(this.state.updateContacts){
            this.updateTransactionStatuses();
        }
    }

    updateTransactionStatuses = () => {
        let changeHappened = !_.isEqual(this.props.contactTransactionPairs, this.state.transactionStatuses);
        if (changeHappened){
            this.props.removeStatusesByTransactionId(this.props.currentTransaction);
            this.props.addMultipleTransactionStatuses(this.state.transactionStatuses);
        }        
    }


    static getDerivedStateFromProps = (nextProps : PaymentBreakdownProps, prevState : PaymentBreakdownState) => {
        if(nextProps.editable !== prevState.editable){
            return ({editable: nextProps.editable})
        }
        if(nextProps.updateContacts !== prevState.updateContacts){
            return ({updateContacts: nextProps.updateContacts}); 
        }
        return null;
    }

    getContactById = (contactId: string) => {
        return this.props.contacts.find((contact : Contact) => {return contactId === contact.id});
    }

    render(){
        const search = this.state.search;

        //Display results of searching for contacts, and add the contact to current Transaction's status list on Select
        let displayResultElement = <FlatList 
                data={this.state.searchResultList} 
                renderItem={ ({item: contact}) => {
                    return(
                    <ListItem
                    onPress={() => {this.addStatusToTransaction(contact); this.setState({contactViewVisible: false});} } 
                    key={contact.id}>
                        <ListItem.Title>
                            {contact.name}
                        </ListItem.Title>
                    </ListItem>
                    )} 
                }
                keyExtractor={(item) => item.id}/>

        return(
            <View>
                <Text style={{borderBottomWidth: 1}}>Recipient(s)</Text>
                <Overlay isVisible={this.state.contactViewVisible} onBackdropPress={() => this.toggleContactView()}
                    overlayStyle={{height: "80%", width: "90%"}}>
                    <React.Fragment>
                        <SearchBar placeholder="Search for contact"
                            onChangeText={this.updateSearch}
                            value={search}/>
                        {displayResultElement}
                    </React.Fragment>
                </Overlay>
                {/* List of contact linked to current transaction's statuses */}
                <View>
                    <ListItem
                    onPress={ () => this.toggleContactView() }
                    containerStyle={this.state.editable? {backgroundColor: "#000000", flex: 0.9} : styles.displayHide}>
                        <ListItem.Content>
                            <ListItem.Title style={{color: "#ffffff"}}>
                                {"Add Contact"}
                            </ListItem.Title>
                            {this.state.transactionStatuses.map((transactionStatus) => (
                                <View style={{flexDirection: 'row', borderBottomWidth: 1}} key={transactionStatus.borrowerId + '-' + transactionStatus.transactionId}>
                                    <ListItem
                                        onPress={ () => console.log("Contact Pressed")}
                                        style={{flex: 0.8}}>
                                        <ListItem.Title style={{fontSize: 14}}>
                                            {this.getContactById(transactionStatus!.borrowerId)!.name}
                                        </ListItem.Title>
                                    </ListItem>
                                    <Text style={{textAlignVertical: 'center'}}>$</Text>    
                                    <TextInput
                                        defaultValue={transactionStatus!.amountOwned.toString()}
                                        onSubmitEditing={ ({nativeEvent}) => this.editAmount(transactionStatus.borrowerId, nativeEvent.text)}
                                        key={transactionStatus!.id}
                                        // style={{flex: 0.8, fontSize: 14}}
                                        keyboardType='number-pad'
                                        editable={this.state.editable}
                                    />
                                    <Button 
                                    icon={
                                        <Icon
                                        name='circle-with-minus'
                                        type='entypo'
                                        size={18}
                                        color="black"
                                        />
                                    }
                                    type="clear"
                                    containerStyle={this.state.editable? styles.removeContactButton : styles.displayHide}
                                    onPress={() => {this.removeStatusFromTransaction(transactionStatus!.borrowerId)}}
                                    /> 
                                </View>
                            ))}
                        </ListItem.Content>
                    </ListItem>
                </View>      
            </View>
        );
    }
}

const styles = StyleSheet.create({
    displayShow: {
        flex: 1,
    },
    displayHide: {
        display: "none"
    },
    removeContactButton: {
        alignSelf: 'center',
    }
});

const mapStateToProps = (state: AppState, ownProps : ParentComponentProps): StateProps => {
    const contactTransactionPairs : TransactionStatus[] = state.transactionStatusReducer;
    const contacts : Contact[] = state.contactReducer;

    const currentTransactionId = ownProps.currentTransaction.id;
    let filteredContactTransactionPairs = contactTransactionPairs.filter((contactTransactionPair) => {
        return contactTransactionPair.transactionId == currentTransactionId;
    });
    
    return {contactTransactionPairs: filteredContactTransactionPairs, contacts};
};

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
    addMultipleTransactionStatuses: (contactTransactionPairs: TransactionStatus[]) => dispatch(addMultipleTransactionStatus(contactTransactionPairs)),
    removeStatusFromTransaction: (contactId : string) => dispatch(removeTransactionStatus(contactId)),
    removeStatusesByTransactionId: (transactionId: string) => dispatch(removeTransactionStatusByTransactionId(transactionId)),
    editAmount: (contactId: string, amount: number) => dispatch(editTransactionStatusAmount(contactId, amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBreakdown);