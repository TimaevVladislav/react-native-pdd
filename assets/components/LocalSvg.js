import React, {useEffect, useState} from "react"

import loadLocalResource from "react-native-local-resource"
import {SvgCss, SvgUri, SvgXml} from "react-native-svg"
export const LocalSvg = ({asset, ...rest}) => {
    const [xml, setXml] = useState(null)

    useEffect(() => {
        loadLocalResource(asset).then(setXml)
    }, [asset])

    return <SvgXml xml={xml} {...rest} />
}
