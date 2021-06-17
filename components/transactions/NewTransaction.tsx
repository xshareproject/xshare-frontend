import * as React from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class NewTransaction extends React.Component{
    constructor(props){
        super(props);
    }
    

    NewTransactionDetails(description){
        return (
            <View style={styles.detailBox}>
                <Text style={styles.detailTitle}>{description}</Text>
                <TextInput style={styles.detailInput} defaultValue={"Enter your " + description + " here"} />
            </View>
        );
    }


    render(){
        return (
            <View style={styles.container}>
                <ScrollView>

                    {/* Header */}
                    <Text style={styles.title}>Create a Transaction</Text>

                    {/* Transaction Amount */}
                    <View style={styles.recipients}>
                        <Text style={styles.header}>Recipients(s)</Text>
                        <Text style={styles.contact}>Kristin Watson</Text> 
                        <Text style={styles.subtotal}>$6</Text>
                    </View>
                    <View style={styles.totals}>
                        <Text style={styles.evenSplit}>Split Evenly</Text>
                        <Text style={styles.grandTotalTitle}>
                        Total: 
                        </Text>
                        <Text style={styles.grandTotal}>$6</Text>
                    </View>

                    {/* Transaction Details */}
                    <View>
                        {this.NewTransactionDetails("Title")}
                        {this.NewTransactionDetails("Notes")}
                        {this.NewTransactionDetails("Deadline")}
                    </View>

                    {/* Attach Reciept */}
                    <View>
                        <Text style={[styles.header, {height: Dimensions.get("window").height * 0.2, marginHorizontal: Dimensions.get("window").width * 0.05 }]}>Attach Reciept</Text>
                    </View>
                    <View>
                        <Text style={styles.button}>Confirm</Text>
                    </View>
                </ScrollView>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height * 0.8, 
        width: Dimensions.get('window').width * 0.8,
        marginHorizontal: Dimensions.get("window").width * 0.1,
        paddingVertical: Dimensions.get("window").width * 0.1,
        marginTop: Dimensions.get("window").height * 0.05,
    },
    title:{
        flex: 1,
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        marginHorizontal: Dimensions.get("window").width * 0.125,
        fontWeight: "bold",
        fontSize: 18,
      },
    recipients: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: Dimensions.get("window").height * 0.01,
        fontWeight: "bold",
        borderBottomColor: "darkgrey",
        borderBottomWidth: 1,
    },
    header: {
        fontWeight: "bold",
        width: "100%",
        paddingVertical: Dimensions.get("window").height * 0.005
    },
    contact: {
        width: "50%",
        paddingVertical: Dimensions.get("window").height * 0.005
    },
    subtotal: {
        width: "20%",
        paddingVertical: Dimensions.get("window").height * 0.005,
        textAlign: "center",
    },
    totals: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: Dimensions.get("window").height * 0.01,
    },
    evenSplit: {
        width: "50%",
        paddingVertical: Dimensions.get("window").height * 0.005
    },
    grandTotalTitle: {
        width: "20%",
        paddingVertical: Dimensions.get("window").height * 0.005,
        textAlign: "center",
    },
    grandTotal: {    
        width: "20%",
        paddingVertical: Dimensions.get("window").height * 0.005,
        textAlign: "center",
    },
    detailBox: {
        paddingVertical: Dimensions.get("window").height * 0.025,
    },
    detailTitle: {
        fontWeight: "bold",
        paddingVertical: Dimensions.get("window").height * 0.005,
    },
    detailInput: {
        color: "grey",
        paddingVertical: Dimensions.get("window").height * 0.005,
        marginHorizontal: Dimensions.get("window").width * 0.025 ,
    },
    button: {
        borderColor: "grey",
        borderRadius: 25,
        paddingVertical: Dimensions.get("window").height * 0.01,
        marginHorizontal: Dimensions.get("window").width * 0.05,
        textAlign: "center",
        color: "white",
        backgroundColor: "navy",
    }
});
