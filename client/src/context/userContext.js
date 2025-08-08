"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();
//set axios to include cookikies in every request

axios.defaults.withCredentials=true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    if (!userState.email.includes("@") || !userState.password || userState.password.length < 6) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      console.log( "user registered successfully", res.data);
      toast.success("Registered successfully");

       // clearing the form 
      setUserState({ name: "", email: "", password: "" });

      //pushing user to login page 
      router.push('/login');
    } catch (error) {
      //console.log("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  // login the user
 // Update loginUser function:
const loginUser = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const res = await axios.post(`${serverUrl}/api/v1/login`, {
      email: userState.email,
      password: userState.password
    }, {
      withCredentials: true
    });

    // Update user state immediately from response
    setUser(res.data.user);
    toast.success("Logged In successfully");
    router.push('/');

  } catch (error) {
    //console.error("Login error:", error);
          toast.error(error.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
    setUserState({ email: "", password: "" });
  }
};
  // get user logged in status  

  const userLoggedInStatus = async()=>{
    if (typeof window === "undefined") return false;

  let LoggedIn= false;
  try {
    const res = await axios.get(`${serverUrl}/api/v1/login-status`,{
      withCredentials: true, 
    });

    //coerace the string to boolean

  LoggedIn=!!res.data;
  setLoading(false);

  if (typeof window !== "undefined" && !LoggedIn) {
    router.push('/login');
  }
    
  } catch (error) {
    console.log("Login error:", error);
    //toast.error(error.response?.data?.message || " Please LoggIn In");
  }

  console.log("User Logged In status", LoggedIn);

  return LoggedIn;
  };

  // second

  const logOutUser = async () => {
  try {
    const res = await axios.get(`${serverUrl}/api/v1/logout`, {
      withCredentials: true,
    });

    console.log("user logged out successfully", res.data);
    toast.success("Logged out successfully");

    // ✅ Clear user from context
    setUser(null);

    // ✅ Force navigation to login
    router.push('/login');

  } catch (error) {
    toast.error(error.response?.data?.message || "Please log in");
  }
};


  // logut the user // firt
  // const logOutUser = async()=>{

    
  //   try {
  //     const res = await axios.get(`${serverUrl}/api/v1/logout`,{
  //       withCredentials: true, 
  //     });

  //     console.log( "user loggedOut successfully", res.data);
  //     toast.success("loggedOut successfully");

  //     //push user to login page 

  //     router.push('/login');
      

      
  //   } catch (error) {
  //    // console.log("Login error:", error);
  //     toast.error(error.response?.data?.message || " Please LoggIn In");
  //   }
  
   
  //   };

    // get user 
    
      // Modify getUser function:
const getUser = async () => {
  if (typeof window === "undefined") return;
  setLoading(true);
  try {
    const res = await axios.get(`${serverUrl}/api/v1/user`, {
      withCredentials: true,
    });

    //first
    setUser(res.data); // Directly set user data
  } catch (error) {
    console.log("User fetch error:", error);
    if (error.response?.status === 401) {
      router.push('/login');
    }
  } finally {
    setLoading(false);
  }
};
 
      
      // Update User details
      const updateUser = async (e, data) => {
        e.preventDefault();
        setLoading(true);
        try {
          const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
            withCredentials: true,
          });
          setUser(prev => ({ ...prev, ...res.data }));
          toast.success("Profile updated!");
        } catch (error) {
         // console.error("Update error:", error);
          toast.error(error.response?.data?.message || "Update failed");
        } finally {
          setLoading(false); // Add this finally block
        }
      };

   // Email Verification 
   const emailVerification = async()=>{
    setLoading(true);
    try {
      const res=await axios.post(`${serverUrl}/api/v1/verify-email`, {}, {
        withCredentials: true,
      });
      toast.success("Emial Sent successfully!");
    } catch (error) {
      //console.error("Email Verification error:", error);
      toast.error(error.response?.data?.message || "Email Verification failed");
    } finally {
      setLoading(false); // Add this finally block
    }
  };
     

  // verify user/email

  const verifyUser = async (token) => {
    setLoading(true);
    try {
      const encodedToken = encodeURIComponent(token);
      
      // Change to GET request
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-user/${encodedToken}`,
        { withCredentials: true }
      );
  
      toast.success("Email verified!");

      
      router.push('/');
      //refresh the home page 
      getUser();
    } catch (error) {
      //console.error("Verification error:", error);
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };


  // forgot password Email
  const forgotpasswordEmail= async(email)=>{
    setLoading(true);
    try {
    
      
    
      const res = await axios.post(
        `${serverUrl}/api/v1/forgot-password`, 
        {
          email ,

        },
        {
           withCredentials: true ,

        }
      );

      toast.success("Forgot password email sent Successfully!"); 
// redirect to login page
      router.push('/login')
    ;
  
  }catch (error) {
    //console.error("Email sent Error:", error);
    toast.error(error.response?.data?.message || "Email can't be sent");
  } finally {
    setLoading(false);
  }
  }


  // reset password 
  const resetPassword= async(token , password)=>{
    setLoading(true);
    try {
    
      
    
      const res = await axios.post(
        `${serverUrl}/api/v1/reset-password/${token}`, 
        {
          password,

        },
        {
           withCredentials: true ,

        }
      );

      toast.success(" Password reset Successfully!"); 

      // redirect to login page 
      router.push('/login');

    ;
  
  }catch (error) {
    //console.error("Password reset Error:", error);
    toast.error(error.response?.data?.message || "Password can't be reset");
  } finally {
    setLoading(false);
  }
  }


  // change password 
  const changePassword= async(currentPassword , newPassword)=>{
    setLoading(true);
    try {
    
      
    
      const res = await axios.patch(
        `${serverUrl}/api/v1/change-password`, 
        {
          currentPassword,
          newPassword,

        },
        {
           withCredentials: true ,

        }
      );

      toast.success(" Password changed Successfully!"); 

      // redirect to login page 
      router.push('/login');

    ;
  
  }catch (error) {
    //console.error("Password change Error:", error);
    toast.error(error.response?.data?.message || "Password can't be changed");
  } finally {
    setLoading(false);
  }
  }


  // admin routes 

  const getAllUsers= async()=>{
    setLoading(true);
    try {
    
      
    
      const res = await axios.get(
        `${serverUrl}/api/v1/admin/users`, 
        {

        },
        {
           withCredentials: true ,

        }
      );

      setAllUsers(res.data);

      toast.success(" Users fetched Successfully!"); 

      // redirect to home page 
      // router.push('/');

    ;
  
  }catch (error) {
    console.error("Fetching Users Error:", error);
    toast.error(error.response?.data?.message || "Users can't be fetched");
  } finally {
    setLoading(false);
  }
  }


  // delete user as and admin
  const deleteUser= async(id)=>{
    setLoading(true);
    try {
    
      
    
      const res = await axios.delete(
        `${serverUrl}/api/v1/admin/user/${id}`, 
        {

        },
        {
           withCredentials: true ,

        }
      );

      

      toast.success(" Users Deleted Successfully!"); 

       //redirect to home page 
      router.push('/');

    ;
  
  }catch (error) {
    console.error("Deleting User Error:", error);
    toast.error(error.response?.data?.message || "User can't deleted");
  } finally {
    setLoading(false);
  }
  }
   
  


  // dynamic form handler 
  const handlerUserInput= (name)=>(e)=>{
    const value = e.target.value;
    setUserState((prevState)=>(
{
  ...prevState,
  [name]:value, 
}
    ));

  }

  console.log("User is " , user);
///// new 
  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoggedInStatus();
      if (isLoggedIn && user === null) {
        await getUser();
      }
    };
    loginStatusGetUser();
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      if (user?.role === 'admin') {
        await getAllUsers();
      }
    };
    fetchAdminData();
  }, [user?.role]);
  //till this 

  return (
    <UserContext.Provider value={{ registerUser , userState , handlerUserInput , loginUser, logOutUser ,  userLoggedInStatus , user , updateUser ,  emailVerification , loading, router , verifyUser , forgotpasswordEmail , resetPassword , changePassword, allUsers, deleteUser, userState ,  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);