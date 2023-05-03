import React, { useEffect } from 'react'
import { verifyUser } from '../utils/APIs'
import { useParams } from 'react-router-dom'
const ConfirmPage = () => {
    const { id }: any = useParams()

    useEffect(() => {
        verifyUser(id)
    }, [])
    return (
        <div>ConfirmPage</div>
    )
}

export default ConfirmPage