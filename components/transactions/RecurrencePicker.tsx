import * as React from 'react';
import {Picker} from '@react-native-picker/picker';
import { TextInput} from 'react-native-gesture-handler';
import { Text, View } from '../Themed';
import * as _ from 'lodash';

/*
*   Recurrence picker component for Recurring Transaction
*
*/
export default function RecurrencePicker(){ 
    let numberOfRecurrence : number = 0;
    const weekValue = "week";
    const monthValue = "month";
    const yearValue = "year";

    const weekday: string[] = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

    var date: string[] = [];
    for (let i = 31; i > 0; i--){
        date.push(_.toString(i));
    }
    date = date.reverse();

    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthEndDate = [31, 30, 29];

    const [recurrenceType, setRecurrenceType] = React.useState(weekValue);
    const [recurrenceDistance, setRecurrenceDistance] = React.useState(0);
    const [recurrenceInstance, setRecurrenceInstance] = React.useState(weekday[0]);
    const [monthInstance, setMonthInstance] = React.useState(months[0]);
    let monthEndInstance = monthEndDate[0];
    
    const headerText = 20;
    const bodyText = 16;

    let pickerStyling = {
        height: 50,
    }
    
    let recurrenceTypePicker = 
    <Picker style={{width: 120, height: 30, fontSize: bodyText}} selectedValue={recurrenceType} onValueChange={(itemValue) => {setRecurrenceType(itemValue.toString())}} prompt="Recurrence Type">
        <Picker.Item label="Week(s)" value={weekValue}/> 
        <Picker.Item label="Month(s)" value={monthValue}/>
        <Picker.Item label="Year(s)" value={yearValue}/>
    </Picker>;

    let recurrenceDistanceInput = 
    <TextInput keyboardType="decimal-pad" 
        onEndEditing={(event) => {setRecurrenceDistance(_.toInteger(event.nativeEvent.text))}}
        style={{textAlignVertical: "top", fontSize: bodyText, paddingLeft: 15}}>
        {recurrenceDistance}
    </TextInput>;

    let weeklySelector = 
        <Picker selectedValue={recurrenceInstance} onValueChange={(itemValue) => {setRecurrenceType(itemValue.toString())}} style={pickerStyling}>
            {weekday.map((instance) => {return <Picker.Item label={instance} value={instance} key={instance}/>})}
        </Picker>;

    let monthlySelector = 
        <Picker selectedValue={recurrenceInstance} onValueChange={(itemValue) => {setRecurrenceType(itemValue.toString())}} style={pickerStyling}>
            {date.map((instance) => {return <Picker.Item label={instance} value={instance} key={instance}/>})}
        </Picker>;

    
    //month with 31 days
    if(monthInstance == months[0] || monthInstance == months[2] || monthInstance == months[4] || monthInstance == months[6] || 
        monthInstance == months[7] || monthInstance == months[9] || monthInstance == months[11]){
        monthEndInstance = monthEndDate[0];
    }
    else{
        //February
        if(monthInstance == months[1]) monthEndInstance = monthEndDate[2];
        //months with 30 days
        else monthEndInstance = monthEndDate[1];
    }

    let yearlySelector =
        <View style={{flexDirection: "row", height: 50}}>
            <Picker selectedValue={recurrenceInstance} onValueChange={(itemValue) => {setRecurrenceType(itemValue.toString())}} style={{flex: 0.5}}>
                {date.slice(0, monthEndInstance).map((instance) => {return <Picker.Item label={instance} value={instance} key={instance}/>})}
            </Picker>
            <Picker selectedValue={monthInstance} onValueChange={(itemValue) => {setMonthInstance(itemValue.toString())}} style={{flex: 0.5}}>
                {months.map((instance) => {return <Picker.Item label={instance} value={instance} key={instance}/>})}
            </Picker>
        </View>;

    let recurrenceInstanceSelector;

    switch (recurrenceType) {
        case weekValue:
            recurrenceInstanceSelector = weeklySelector;
            break;
        case monthValue:
            recurrenceInstanceSelector = monthlySelector;
            break;
        case yearValue:
            recurrenceInstanceSelector = yearlySelector;
            break;
        default:
            recurrenceInstanceSelector = weeklySelector;
            break;
    }

    let recurrencePanel = 
        <View>
            <Text style={{fontSize: headerText}}>Recurrence</Text>
            <View style={{flexDirection: "row"}}>
                <View style={{paddingTop: 4, flexDirection: "row"}}>
                    <Text style={{fontSize: bodyText}}>Repeat every</Text>
                    {recurrenceDistanceInput}
                </View>
                {recurrenceTypePicker}
            </View>
            <View>
                {yearlySelector}
            </View>
        </View>

    return recurrencePanel;
}