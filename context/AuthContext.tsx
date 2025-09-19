import { auth } from "@/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AUthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => {}
  })


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user) =>{
      setUser(user?? null)
      setLoading(false)
    })
    return unsubscribe
  },[])

  const logout = async () => {
    try {
      console.log('Logging out user...');
      await signOut(auth);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  return (
    <AUthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AUthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AUthContext)
}
