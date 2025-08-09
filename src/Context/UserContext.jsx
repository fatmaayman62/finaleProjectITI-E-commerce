//any change in context in any place make re-render
import { createContext, useEffect, useState } from "react";


export let CounterContext=createContext(0);

export default function UserContextProvider(props){
    let [counter,setCounter]=useState(null); 
    useEffect(()=>{
        
       if(localStorage['userToken'] !== null){
        setCounter(localStorage['userToken']);
       }
    },[]);
    
    return <CounterContext.Provider value={ {counter,setCounter} }>
    {props.children}
    </CounterContext.Provider>
    

}