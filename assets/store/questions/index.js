import {useRoute} from "@react-navigation/native"

export const useSwitcher = () => {
    const route = useRoute()
    let uriTicket = require('./A_B/tickets/Билет 1.js')

    switch (route.params.key) {
        case 1:
            uriTicket = require('./A_B/tickets/Билет 1.js');
            break
        case 2:
            uriTicket = require('./A_B/tickets/Билет 2.js');
            break
        case 3:
            uriTicket = require('./A_B/tickets/Билет 3.js');
            break
        case 4:
            uriTicket = require('./A_B/tickets/Билет 4.js');
            break
        case 5:
            uriTicket = require('./A_B/tickets/Билет 5.js');
            break
        case 6:
            uriTicket = require('./A_B/tickets/Билет 6.js');
            break
        case 7:
            uriTicket = require('./A_B/tickets/Билет 7.js');
            break
        case 8:
            uriTicket = require('./A_B/tickets/Билет 8.js');
            break
        case 9:
            uriTicket = require('./A_B/tickets/Билет 9.js');
            break
        case 10:
            uriTicket = require('./A_B/tickets/Билет 10.js');
            break
        case 11:
            uriTicket = require('./A_B/tickets/Билет 11.js');
            break
        case 12:
            uriTicket = require('./A_B/tickets/Билет 12.js');
            break
        case 13:
            uriTicket = require('./A_B/tickets/Билет 13.js');
            break
        case 14:
            uriTicket = require('./A_B/tickets/Билет 14.js');
            break
        case 15:
            uriTicket = require('./A_B/tickets/Билет 15.js');
            break
        case 16:
            uriTicket = require('./A_B/tickets/Билет 16.js');
            break
        case 17:
            uriTicket = require('./A_B/tickets/Билет 17.js');
            break
        case 18:
            uriTicket = require('./A_B/tickets/Билет 18.js');
            break
        case 19:
            uriTicket = require('./A_B/tickets/Билет 19.js');
            break
        case 20:
            uriTicket = require('./A_B/tickets/Билет 20.js');
            break
        case 21:
            uriTicket = require('./A_B/tickets/Билет 21.js');
            break
        case 22:
            uriTicket = require('./A_B/tickets/Билет 22.js');
            break
        case 23:
            uriTicket = require('./A_B/tickets/Билет 23.js');
            break
        case 24:
            uriTicket = require('./A_B/tickets/Билет 24.js');
            break
        case 25:
            uriTicket = require('./A_B/tickets/Билет 25.js');
            break
        case 26:
            uriTicket = require('./A_B/tickets/Билет 26.js');
            break
        case 27:
            uriTicket = require('./A_B/tickets/Билет 27.js');
            break
        case 28:
            uriTicket = require('./A_B/tickets/Билет 28.js');
            break
        case 29:
            uriTicket = require('./A_B/tickets/Билет 29.js');
            break
        case 30:
            uriTicket = require('./A_B/tickets/Билет 30.js');
            break
        case 31:
            uriTicket = require('./A_B/tickets/Билет 31.js');
            break
        case 32:
            uriTicket = require('./A_B/tickets/Билет 32.js');
            break
        case 33:
            uriTicket = require('./A_B/tickets/Билет 33.js');
            break
        case 34:
            uriTicket = require('./A_B/tickets/Билет 34.js');
            break
        case 35:
            uriTicket = require('./A_B/tickets/Билет 35.js');
            break
        case 36:
            uriTicket = require('./A_B/tickets/Билет 36.js');
            break
        case 37:
            uriTicket = require('./A_B/tickets/Билет 37.js');
            break
        case 38:
            uriTicket = require('./A_B/tickets/Билет 38.js');
            break
        case 39:
            uriTicket = require('./A_B/tickets/Билет 39.js');
            break
        case 40:
            uriTicket = require('./A_B/tickets/Билет 40.js');
            break

    }
    return {uriTicket}
}
