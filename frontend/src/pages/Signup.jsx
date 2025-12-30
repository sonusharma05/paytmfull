import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/Subheading"

export const Signup =() =>{
    return <div className="bg-slate-300 h-screen flex justify-center ">
        <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
           <Heading label={"Signup"}/>
            <SubHeading label={"Enter your information to create an account"}/>
            <InputBox label={"first Name"} placeholder={"john"} />
            <InputBox label={"Last Name "} placeholder={"doe"}/>
            <InputBox label={"Email"} placeholder={"johndoe@gmail.com"}/>
            <InputBox label={"Password"} placeholder={"*******"}/>
            <Button label={"Signup"} />
            <BottomWarning label={"Already has an Account?" } to={"/Signin"} bottomText={"login"}/>
        </div>
        </div>
    </div>
}