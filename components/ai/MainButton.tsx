import { RiRobot3Line,RiCloseFill } from "react-icons/ri";

export default function AIMainButton({opened,setOpen}:{opened:boolean,setOpen:Function}) {
    return (
        <button onClick = {() => setOpen()} className = {'button p-0 h-[50px] flex justify-center bg-blue text-white fixed w-[50px]! items-end text-center bottom-5 inset-e-5 '+ (opened ? "opacity-[0.75]":'')}>
            {opened ? <RiCloseFill size = {30}/>:<RiRobot3Line size = {30}/>}
        </button>
    );
}