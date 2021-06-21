import {Platform} from "react-native";

function formatDate(date : Date) : string {
    if (Platform.OS === 'ios')
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    else {
        let castedDate = new Date(date);
        var
            dayOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
            monthName = ["January", "February", "March", "April", "May", "June",
                         "July", "August", "September", "October", "November", "December"],
            utc = castedDate.getTime() + castedDate.getTimezoneOffset() * 60000,
            US_time = utc + (3600000 * -4),
            US_date = new Date(US_time);

        return monthName[US_date.getMonth()] + " " + US_date.getDate() + ", " + US_date.getFullYear();
    }
}

export {formatDate};
