import React, {useRef,useState,useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import JSONPretty from "react-json-pretty";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import classes from "*.module.css";
import TextField from '@material-ui/core/TextField';
import {
    List,
    ListItem,
    Avatar,
    ListItemAvatar,
    ListItemSecondaryAction,
    IconButton,
    ListItemText
  } from '@material-ui/core'

  import {
    Folder as FolderIcon,
    Delete as DeleteIcon
  } from '@material-ui/icons';
import { compileFunction } from "vm";
//------
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

import InfoIcon from '@material-ui/icons/Info';

  



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: "100vh",
      marginTop: 20
     
    },
    TextField: {

            '& > *': {
                margin: theme.spacing(1),
              
        }
    },
    Button:{
        '& > *': {
            margin: theme.spacing(1),
            marginTop: 5,
            marginBottom: 5
          },
    },
    gridlistroot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: "100%",
        height: "100%",
      },
      gridlisticon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
   

 
  }));


 



const Mainpage = () =>{

    const {user, isAuthenticated} = useAuth0();

    const classes = useStyles()

    const [list, setList] = useState([]);
    const [count,setCount] = useState(0)
    const [userData,setUserData] = useState({})
    const [returnedPostData,setReturnedPostData] = useState({})
    const [recipes,setRecipes] = useState([])
    //----
    /*
    function filterRecipes(arg){
        if(arg.sections[0].components.length===list.length){
            const ingredientsArray = []
            
            arg.sections[0].components.forEach(item=>{ingredientsArray.push(item.ingredient.name)
            console.log(ingredientsArray)})

            for(let i=0;i<list.length;i++){

                

                    if(ingredientsArray.includes(list[i])===false){
                        return false
                    }else if(ingredientsArray.includes(list[i])===false){
                        return true
                    }
                
            }
        }
    }

    const newRecipes = recipes.filter(recipe=> {
        //components.length===list.length && ___
        // nest one if condition inside of another
        filterRecipes(recipe)
       
    })*/

    //---


    const [ingredients,setIngredients] = useState([])
    const inputRef = useRef();
    const newlist = list.map(item=>item)
    const iduser = userData.userId
  
   

//Explain how we're using inputRef with the textfield 

    const handleSubmit = (event)=> {
        event.preventDefault()
        setList([...list, inputRef.current.value]) //Does this syntax mean you're pushing inputRef.current.value onto an array? How is that differnt than merging?Is this a controlled variable
        console.log("This is the current list: ",list)
        console.log("This is the current value in the input field: ",inputRef.current.value)
    }

    //When a user signs in and is not in the database use a post request to add his id to the database. If the user is already in the database don't do anything


   

    useEffect(()=>{
       
        function postRequest(){
            
            console.log("Ths value of iduser is :", iduser)

            axios.post("/api/pantry",{userId:iduser,ingredients:newlist}).then(result=>{
                
                //if post request is successful make a axios get request to the tasty api here

                setReturnedPostData({result})
                console.log("This is the data we get back from making a post request: ",result)
            }).catch(err=>{
                console.log("There was an error with the post request: ",err)
            })

        }
        

        postRequest()

        //API call here (post request)
        // return axios.post("/api/pantry",data)
    },[count])

    console.log("Use effect was activated. The count is: ",count)
    console.log("This is the current userData: ",userData)


    const sendData = () =>{

        //console.log("These are the filtered recipes: ",newRecipes)
        //***********I'm not making an api call inside the useEffect hook. How will this be a problem later?*****************
       axios.get("https://tasty.p.rapidapi.com/recipes/list?rapidapi-key=de347e5db0msha96abb0356a3c81p10f425jsn336bf5c8e455").then(response=>{
           
                setRecipes(response.data.results)
       
            console.log("This is the result from rapidapi: ",response.data.results)})
            .catch(err=>{console.log("There as an error with the axios get request: ",err)})
        

        


        setCount(count+1)
        console.log("This is the current count state: ",compileFunction)
        setUserData({userId: user.sub, ingredients: list})
        console.log("This is the current users ingredients list: ",userData.ingredients)
        /*
        const userData = {
            userId: user.sub,
            ingredients: list
        }*/

    }



    return (

        isAuthenticated &&(
          
            <Grid className={classes.containerHeight} container m={3} spacing={1}>

                <Grid   m={3} item xs={12} sm={2} >
        
                    <Paper className={classes.paper}>

                        <form  className={classes.TextField} noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField inputProps={{ref: inputRef}}  xs={12} sm={2} id="standard-basic" label="Ingredients" />
                        </form>

                        <Button variant="contained" color="primary" onClick={sendData}>
                           Finish List
                        </Button>


                        <List dense={true}>
                            {
                                list.map((item, i)=><ListItem key={i}>
                                <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                primary={item}
                                />
                                <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                                )}
                        </List>

                    </Paper>
        
                </Grid>
        
                <Grid item xs={12} sm={7}>
        
                    <Paper className={classes.paper} >
                                

                        <GridList cellHeight={180} className={classes.gridList}>
                            <GridListTile key="Subheader" cols={2} style={{ height: 'auto'}}>
                            <ListSubheader component="div">Recommended Recipes</ListSubheader>
                            </GridListTile>
                            {recipes.map((recipe) => (
                            <GridListTile key={recipe.thumbnail_url}>
                                <img src={recipe.thumbnail_url} alt={recipe.name} />
                                <GridListTileBar
                                title={recipe.name}
                                subtitle={<span>by: {recipe.credits[0].name}</span>}
                                actionIcon={
                                    <IconButton aria-label={`info about ${recipe.name}`} className={classes.icon}>
                                    <InfoIcon />
                                    </IconButton>
                                }
                                />
                            </GridListTile>
                            ))}
                        </GridList>



                                
                                

                    </Paper>
        
                </Grid>
        
                <Grid item xs={12} sm={3}>
        
                    <Paper className={classes.paper} >
                        Pantry
                    </Paper>
        
                </Grid>
        
        
            </Grid>


       )
     
    )

}


export default Mainpage