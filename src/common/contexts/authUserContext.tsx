import React, {useState, useCallback, createContext, ReactNode, FC} from 'react'

export type AuthContextType = {
    role: any | null;
}

export const APIErrorContext = createContext<AuthContextType | null>(null);

interface APIErrorProviderProps {
    children?: ReactNode;
}

export const APIErrorContextProvider: FC<APIErrorProviderProps> = ({children}) => {
    const [role, setRole] = useState<any | null>()
    const contextValue = {
       role
    }
    return (
        <APIErrorContext.Provider value={contextValue}>
            {children}
        </APIErrorContext.Provider>
    )
}