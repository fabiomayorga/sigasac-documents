import * as moment from 'moment';
import 'moment/locale/es';

export class DatesHelper {
    static setLocalTime(date: Date | string) {
        const fecha = moment(date)
            .utc(true)
            .locale('es');

        return fecha.format('dddd DD [de] MMMM [de] YYYY, h:mm:ss a');
    }

    static addDayToDate(date: Date | string, amount: number = 1) {
        return moment(date)
            .add(amount, 'day')
            .format('YYYY-MM-DD HH:mm:ss')
            .toString();
    }

    static addMonthToDate(date: Date | string, amount: number = 1) {
        return moment(date)
            .add(amount, 'months')
            .format('YYYY-MM-DD HH:mm:ss')
            .toString();
    }

    /**
     * Obtiene la diferencia en horas entre date2 y date1.
     *
     * @param date1 fecha 1
     * @param date2 fecha 2
     */
    static getDiffDates(date1: Date | string, date2: Date | string) {
        return moment(date2).diff(moment(date2), 'hours');
    }
}
