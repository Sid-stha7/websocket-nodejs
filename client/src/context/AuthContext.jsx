import { createContext, useCallback, useState } from "react";
import { baseUrl, posRequest } from "../utils/service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [resigerError, seRegisterError] = useState(null);

  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log("registerInfo", registerInfo);

  // use callback hooks
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(async () => {
    setIsRegisterLoading(true);
    seRegisterError(null);

    const response = await posRequest(
      `${baseUrl}/users/register/`,
      JSON.stringify(registerInfo)
    );

    setIsRegisterLoading(false);

    if (response.erro) {
      return seRegisterError(response);
    }

    // set to local storage so that we dont have to login again
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
