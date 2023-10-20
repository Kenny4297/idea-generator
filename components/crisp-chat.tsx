"use client"

import { useEffect} from 'react';
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("03c17151-40c7-477b-bab0-06117afa90d3")
    }, [])

    return null
}