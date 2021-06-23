import * as React from 'react';
import { Text, View } from './Themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, ScrollView} from 'react-native-gesture-handler';
import { formatDate } from '../utility/utility';
import { StyleSheet, KeyboardAvoidingView, Platform, Route, StyleProp, TextStyle } from 'react-native';
import { defaults } from 'lodash';
import { Transaction } from '../redux/types/types.Transaction';


interface DateInputWithLabelProps{
    currentObject: Transaction,
    property: keyof Transaction,
    label: string,
    editable: boolean,
    valueType?: string,
    onChangeCallback: (property: keyof Transaction, value: string) => void,
    labelStyle: StyleProp<TextStyle>,
    inputStyle: StyleProp<TextStyle>
}

var DateInputWithLabel = (props : DateInputWithLabelProps) => {
    var fieldValue = props.currentObject[props.property];
    var label : string = props.label;
    const [displayDatePicker, setDisplayDatePicker] = React.useState(false);
    const options = {year: 'numeric', month: 'short', day: '2-digit' };
    return (
        <View>
            <Text style={props.labelStyle}>{label}</Text>
            <Text style={props.inputStyle} 
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

export default DateInputWithLabel;