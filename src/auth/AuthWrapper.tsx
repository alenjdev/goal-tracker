import {
    FC,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
 
  
  import { useNavigate } from "react-router";
  
  export interface IAuthContext {
    user: any | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    pending: boolean;
    signUpWithGoogle: () => Promise<void>;
  }
  
  const AuthContext = createContext<IAuthContext>({
    user: null,
    login: async () => {},
    logout: async () => {},
    signUpWithGoogle: async () => {},
    isAuthenticated: false,
    pending: true,
  });
  
  export const AuthData = () => useContext(AuthContext);
  
  interface IAuthWrapperProps {
    children: ReactNode | ReactNode[];
  }
  
  export const AuthWrapper: FC<IAuthWrapperProps> = ({ children }) => {
    const [auth] = useState(firebaseAuth);
  
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pending, setPending] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      auth.onAuthStateChanged((_) => {
        if (_ === null) {
          setPending(false);
          return;
        }
        setPending(false);
        setUser(_);
        setIsAuthenticated(true);
        return;
      });
    }, [auth]);
  
    //PREFER METHOD FOR WEB
    const signUpWithGoogle = async () => {
      try {
        const response = await signInWithPopup(firebaseAuth, googleAuthProvider);
        setUser(response.user);
        setIsAuthenticated(true);
        navigate("/home");
      } catch (error) {
        showError("Can't sign up with Google");
      }
    };
  
    const login = async (email: string, password: string) => {
      try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        showError("Can't login");
      }
    };
  
    const logout = () => {
      signOut(auth).then(() => {
        setUser(null);
        setIsAuthenticated(false);
        navigate("/");
      });
    };
  
    return (
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
          isAuthenticated,
          pending,
          signUpWithGoogle,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  