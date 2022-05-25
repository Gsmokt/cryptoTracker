import React, {createContext, useState} from 'react';

export const AppContext = createContext();

const Store = ({children}) => {


    const [isLogged, setIsLogged] = useState( localStorage.getItem("isLogged") );


    return ( 
        <AppContext.Provider value={{isLogged, setIsLogged}}>
            {children}
        </AppContext.Provider>
     );
}
 
export default Store;