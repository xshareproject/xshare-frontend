import * as React from 'react';
import { Text, View } from '../components/Themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, ScrollView} from 'react-native-gesture-handler';
import { formatDate } from '../utility/utility';
import { StyleSheet, KeyboardAvoidingView, Platform, Route } from 'react-native';


interface FieldInputWithLabelProps{
    currentObject: any,
    property: string,
    label: string,
    editable: boolean,
    valueType?: string,
    onChangeCallback: (property: string, value: any) => void
}

export default function FieldInputWithLabel(props : FieldInputWithLabelProps){
    var fieldValue = props.currentObject[props.property];
    var label : string = props.label;
    var styling = styles.inputFieldEditable;
    const [displayDatePicker, setDisplayDatePicker] = React.useState(false);

    if (props.property === "paymentDate"){
            const options = {year: 'numeric', month: 'short', day: '2-digit' };
            return (
            <View>
                <Text style={{borderBottomWidth: 1}}>{label}</Text>
                <Text style={styling} 
                onPress={() => {if (props.editable) setDisplayDatePicker(true); }}>
                {fieldValue}  
                </Text>
                {displayDatePicker &&  
                <DateTimePicker
                    value={new Date(fieldValue)}
                    mode={'date'}
                    display="default"
                    onChange={(event, date) => {
                            setDisplayDatePicker(false);
                            props.onChangeCallback(props.property, formatDate(date!)); 
                        }
                    }  
                />}
            </View> 
        );
    }
    else{
        return (
            <View>
                <Text style={{borderBottomWidth: 1}}>{label}</Text>
                <TextInput 
                    style={styling} 
                    keyboardType={props.valueType! === 'number' ? "number-pad" : 'default'}
                    onChangeText={(text) => 
                        props.onChangeCallback(props.property, text)}
                    editable={props.editable}>
                    {fieldValue}  
                </TextInput>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    inputFieldEditable: {
        paddingLeft: 5, 
        backgroundColor: '#ffffff', 
        flex: 1,
        borderBottomWidth: 1
    }
});