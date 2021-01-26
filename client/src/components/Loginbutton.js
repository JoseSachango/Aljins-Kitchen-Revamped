import React from "react"
import {useAuth0} from '@auth0/auth0-react'
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./LoginButton.css";
/*
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

*/



const Loginbutton = ()=>{
    //const classes = useStyles()
    const {loginWithRedirect,isAuthenticated} = useAuth0()


    return (

      !isAuthenticated &&(
        <Button variant="contained" color="secondary" onClick={()=>loginWithRedirect()}>
            Log In
        </Button>

    )
      

      

    )
}


export default Loginbutton


