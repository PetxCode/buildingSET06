import { useState } from "react";
import Button from "../components/Static/Button";
import { signin, verifyStaffAccount } from "../utils/APIs";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, updateToken } from "../Global/globalState";
import { useNavigate, useParams } from "react-router-dom";

const FinallyVerifiedStaff = () => {
    const { id } = useParams()
    const [OTP, setOTP] = useState<string>("");

    return (
        <div className="h-[calc(100vh-5rem)] flex justify-center items-center w-100% bg-slate-400 ">
            <div className="w-[600px] min-h-[200px] bg-green-300 flex justify-center items-center flex-col py-[30px]">
                <input
                    placeholder="Enter OTP"
                    className="my-2 w-[400px] h-12 outline-0 pl-5 rounded "
                    value={OTP}
                    onChange={(e: any) => {
                        setOTP(e.target.value);
                    }}
                />

                <br />
                <br />
                <Button
                    title="Enter Tot Verify"
                    bb="bg-teal-400"
                    cc="text-white"
                    onClick={() => {
                        verifyStaffAccount(id!, { OTP }).then(() => {
                            console.log("awesome")
                        })
                    }}
                />


            </div>
        </div>
    );
};

export default FinallyVerifiedStaff;
