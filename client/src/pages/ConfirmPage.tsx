import React, { useEffect } from 'react'
import { deleteUser, finallyVerified, verifyUser } from '../utils/APIs'
import { useParams } from 'react-router-dom'
import Button from '../components/Static/Button'
const ConfirmPage = () => {
    const { id }: any = useParams()


    return (
        <div>
            <div>
                <div>
                    <Button
                        bb="bg-red-500"
                        cc="white"
                        title='NO'
                        onClick={() => {
                            deleteUser(id)
                        }}
                    />
                </div>
                <div>
                    <Button
                        title='Yes'
                        bb="bg-green-500"
                        onClick={() => {
                            finallyVerified(id).then(() => {
                                console.log("MGS sent")
                            })
                        }}
                    />
                </div>

                {id}
            </div>
        </div>
    )
}

export default ConfirmPage