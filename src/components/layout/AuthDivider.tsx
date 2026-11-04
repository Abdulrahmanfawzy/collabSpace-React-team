import { Separator } from "../ui/Separator";


const AuthDivider=()=>{
    return (
    <div className="relative flex items-center justify-center my-6">
    <Separator variant="gray" />
    <span className="absolute bg-white px-3 text-xs font-medium text-gray-400 select-none">
        OR
    </span>
    </div>
    )
}
export default AuthDivider;
