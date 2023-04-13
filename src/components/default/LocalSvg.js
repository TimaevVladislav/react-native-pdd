import React, {useEffect, useState} from "react"
import {Asset} from "expo-asset"
import {SvgXml} from "react-native-svg"


export const LocalSvg = ({asset, ...rest}) => {
    const [xml, setXml] = useState(null)

    const loadSvg = async () => {
        const {uri} = Asset.fromModule(asset)
        const response = await fetch(uri)
        const text = await response.text()
        setXml(text)
    }

    useEffect( () => {
          loadSvg()
    }, [asset])

    return <SvgXml xml={xml} {...rest} />
}
