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
            uriTicket = require('./A_B/tickets/Билет 3.json');
            break
        case 4:
            uriTicket = require('./A_B/tickets/Билет 4.json');
            break
        case 5:
            uriTicket = require('./A_B/tickets/Билет 5.json');
            break
        case 6:
            uriTicket = require('./A_B/tickets/Билет 6.json');
            break
        case 7:
            uriTicket = require('./A_B/tickets/Билет 7.json');
            break
        case 8:
            uriTicket = require('./A_B/tickets/Билет 8.json');
            break
        case 9:
            uriTicket = require('./A_B/tickets/Билет 9.json');
            break
        case 10:
            uriTicket = require('./A_B/tickets/Билет 10.json');
            break
        case 11:
            uriTicket = require('./A_B/tickets/Билет 11.json');
            break
        case 12:
            uriTicket = require('./A_B/tickets/Билет 12.json');
            break
        case 13:
            uriTicket = require('./A_B/tickets/Билет 13.json');
            break
        case 14:
            uriTicket = require('./A_B/tickets/Билет 14.json');
            break
        case 15:
            uriTicket = require('./A_B/tickets/Билет 15.json');
            break
        case 16:
            uriTicket = require('./A_B/tickets/Билет 16.json');
            break
        case 17:
            uriTicket = require('./A_B/tickets/Билет 17.json');
            break
        case 18:
            uriTicket = require('./A_B/tickets/Билет 18.json');
            break
        case 19:
            uriTicket = require('./A_B/tickets/Билет 19.json');
            break
        case 20:
            uriTicket = require('./A_B/tickets/Билет 20.json');
            break
        case 21:
            uriTicket = require('./A_B/tickets/Билет 21.json');
            break
        case 22:
            uriTicket = require('./A_B/tickets/Билет 22.json');
            break
        case 23:
            uriTicket = require('./A_B/tickets/Билет 23.json');
            break
        case 24:
            uriTicket = require('./A_B/tickets/Билет 24.json');
            break
        case 25:
            uriTicket = require('./A_B/tickets/Билет 25.json');
            break
        case 26:
            uriTicket = require('./A_B/tickets/Билет 26.json');
            break
        case 27:
            uriTicket = require('./A_B/tickets/Билет 27.json');
            break
        case 28:
            uriTicket = require('./A_B/tickets/Билет 28.json');
            break
        case 29:
            uriTicket = require('./A_B/tickets/Билет 29.json');
            break
        case 30:
            uriTicket = require('./A_B/tickets/Билет 30.json');
            break
        case 31:
            uriTicket = require('./A_B/tickets/Билет 31.json');
            break
        case 32:
            uriTicket = require('./A_B/tickets/Билет 32.json');
            break
        case 33:
            uriTicket = require('./A_B/tickets/Билет 33.json');
            break
        case 34:
            uriTicket = require('./A_B/tickets/Билет 34.json');
            break
        case 35:
            uriTicket = require('./A_B/tickets/Билет 35.json');
            break
        case 36:
            uriTicket = require('./A_B/tickets/Билет 36.json');
            break
        case 37:
            uriTicket = require('./A_B/tickets/Билет 37.json');
            break
        case 38:
            uriTicket = require('./A_B/tickets/Билет 38.json');
            break
        case 39:
            uriTicket = require('./A_B/tickets/Билет 39.json');
            break
        case 40:
            uriTicket = require('./A_B/tickets/Билет 40.json');
            break

    }
    return {uriTicket}
}
