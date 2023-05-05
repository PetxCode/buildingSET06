import React, { useEffect } from 'react'
import { verifyAdmin, } from '../utils/APIs'
import { useParams } from 'react-router-dom'
import Button from '../components/Static/Button'
const ConfirmAdminPage = () => {
    const { id }: any = useParams()

    useEffect(() => {
        verifyAdmin(id)
    }, [])
    return (
        <div>
            <div>
                Congratulations your Account has been verified successfully,

                you can now sign in
            </div>
            {id}
        </div>
    )
}

export default ConfirmAdminPage