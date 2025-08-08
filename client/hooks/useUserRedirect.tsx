// hooks/useUserRedirect.tsx
"use client"
import { useUserContext } from "@/context/userContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

const useUserRedirect = (redirectPath: string) => {
    // const { userLoggedInStatus } = useUserContext();

    const {user}= useUserContext();
    const router = useRouter();
    
    useEffect(() => {
        const checkAuth = async () => {

            if(!user || !user.email) {
                // If user is not logged in, redirect to the specified path
                router.push(redirectPath);
            }

            // try {
            //     // const isLoggedIn = await userLoggedInStatus();
                
            //     // Corrected logic: Only redirect if NOT logged in
            //     // if (!isLoggedIn) {
            //     //     router.push(redirectPath);
            //     // }
            // } catch (error) {
            //     // console.log("Auth check failed", error);
              
            // }
        };
        checkAuth();
    }, [ user , redirectPath, router]);
};

export default useUserRedirect;