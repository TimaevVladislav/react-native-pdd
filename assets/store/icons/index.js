import {useRoute} from "@react-navigation/native"

export const useSwitcher = () => {
    const route = useRoute()
    let uriIcon = require('../../store/icons/extra/svgexport-222.svg')

    switch (route.params.key) {
        case 1:
            uriIcon = require('../../store/icons/extra/svgexport-223.svg');
        break
    }
    return { uriIcon }
}
