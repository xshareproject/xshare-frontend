import * as React from 'react';
import { Text, View } from '../components/Themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, ScrollView} from 'react-native-gesture-handler';
import { formatDate } from '../utility/utility';
import { StyleSheet, KeyboardAvoidingView, Platform, Route, StyleProp, TextStyle } from 'react-native';
import { defaults } from 'lodash';
import {Transaction} from '../redux/types/types.Transaction';
import {Contact} from '../redux/types/types.Contact';

interface FieldInputWithLabelProps{
    currentObject: Transaction | Contact,
    property: keyof Transaction | keyof Contact,
    label: string,
    editable: boolean,
    valueType?: string,
    onChangeCallback: (property: keyof Transaction | keyof Contact, value: string | number) => void,
    labelStyle: StyleProp<TextStyle>,
    inputStyle: StyleProp<TextStyle>
}

var FieldInputWithLabel = (props : FieldInputWithLabelProps) => {
    var fieldValue = props.currentObject[props.property];
    var label : string = props.label;
    return (
        <View>
            <Text style={props.labelStyle}>{label}</Text>
            <TextInput 
                style={props.inputStyle} 
                keyboardType={props.valueType! === 'number' ? "number-pad" : 'default'}
                onChangeText={(text) => 
                    props.onChangeCallback(props.property, text)}
                editable={props.editable}>
                {fieldValue}  
            </TextInput>
        </View> 
    );
}

export default FieldInputWithLabel;