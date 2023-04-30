import { useState } from "react"
import { viewUser } from "../utils/APIs"
import { useSelector } from "react-redux";
import decode from "jwt-decode"

export const useOne = () => {
    const token = useSelector((state: any) => state.token);
    let showDecoded: any;
    if (token) {
        showDecoded = decode(token)
    }
    console.log(showDecoded)

    const [userData, setUserData] = useState()

    viewUser(showDecoded?.id).then((res) => {
        setUserData(res?.data.data)
    })

    return userData
}