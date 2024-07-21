'use client'


import {useStoreon} from "storeon/react";
import {useRouter} from "next/navigation";

export const LoginButton = () => {
    const {token} = useStoreon<{token: string}>('token')
    const router = useRouter()



    return <div>
        {token ? `User token: ${token}` : <button
        onClick={()=> {
            router.push('/login')
        }}
        >login</button> }
    </div>
}
