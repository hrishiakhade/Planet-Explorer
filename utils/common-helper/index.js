
import Moment from 'moment';


export function convertDate(date){
    Moment.locale('en');
    return Moment(date).format('LLL');
}