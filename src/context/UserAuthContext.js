import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  deleteUser,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // connect
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // création de compte
  const signUp = (email, password, displayName) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName,
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  // disconnect
  const logOut = () => {
    return signOut(auth);
  };

  // refresh a new password
  const updatePwd = (user, newPassword) => {
    return updatePassword(user, newPassword);
  };

  // delete user
  const delUser = (user) => {
    return deleteUser(user);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log("Auth", currentuser);
      if (currentuser) {
        setUser(currentuser);
        setDisplayName(currentuser?.displayName);
        setNewPassword(currentuser?.password);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        displayName,
        newPassword,
        logIn,
        signUp,
        logOut,
        delUser,
        updatePwd,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
