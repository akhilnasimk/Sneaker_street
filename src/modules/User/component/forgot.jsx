import React from "react";
function Forgot(){
    return(
        <>
        <h1 style={{textAlign:"center"}}>This is a Forgot password page</h1>
        <input type="text" placeholder="enter the passwod">
        </input>
        </>
    )
}
export default React.memo(Forgot)