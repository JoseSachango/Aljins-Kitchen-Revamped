import React, { useRef, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
// import JSONPretty from "react-json-pretty";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./Mainpage.css";
//import classes from "*.module.css";
import TextField from "@material-ui/core/TextField";
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { Folder as FolderIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { compileFunction } from "vm";
//------
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import clsx from 'clsx';
// import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100vh",
    marginTop: 20,
  },
  TextField: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  ListItemText: {
    maxWidth: 1,
  },
  Button: {
    "& > *": {
      margin: theme.spacing(1),
      marginTop: 5,
      marginBottom: 5,
    },
  },
  gridlistroot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  gridlisticon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },	      

}));

const Mainpage = () => {
  const { user, isAuthenticated } = useAuth0();

  const classes = useStyles();

  // const [deleteItem, setDeleteItem] = useState({});
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState({});
  const [returnedPostData, setReturnedPostData] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [show, setShow] = useState(0);
  const [indexValue,setIndexValue] =useState([])


  useEffect(()=>{
    setShow(indexValue[0])
},[indexValue])



  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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

  //const [ingredients, setIngredients] = useState([]);
  const inputRef = useRef();
  // const newlist = list.map(item => item)
  const iduser = userData.userId;

  //Explain how we're using inputRef with the textfield

        //---- Hanan and Jin's work
        function pantryList() {

          if (isAuthenticated) {
            axios
              .get("/api/pantry/" + user.sub)
              .then((result) => {
                  console.log("This is the result from the get request to the endpoint with the usersId:",result.data)
                setList(result.data.ingredients);
              })
              .catch(err=>{
                  console.log("There was an error with the get request to the endpoint with the userId: ",err)});
          }

      }


      useEffect(() => {
          pantryList();
      }, [isAuthenticated])
      //-----


  const handleSubmit = (event)=> {
    event.preventDefault()
    setList([...list, inputRef.current.value]) //Does this syntax mean you're pushing inputRef.current.value onto an array? How is that differnt than merging?Is this a controlled variable
    //console.log("This is the current list: ",list)
    //console.log("This is the current value in the input field: ",inputRef.current.value)
    inputRef.current.value = ""
}

  //When a user signs in and is not in the database use a post request to add his id to the database. If the user is already in the database don't do anything

  // useEffect(() => {

    function postRequest(){
            
      //console.log("Ths value of iduser is :", iduser)

      //Do a get request to see if there is a user in the database with a specfific user id. if there is then perform an update. if there isn't then perform a post request
      
   

          axios.get("/api/pantry/"+user.sub).then(result=>{

              if(result.data.userId){
                  console.log("This is the value of user.sub before it is sent via put request: ",user.sub)
                  console.log("This is the value of list before it is sent via the put request: ",list)
                  axios.put("/api/pantry/"+user.sub,{ingredients:list}).then(results=>{
                      console.log("The put request was successfully made. We returned the value: ",results)
                  }).catch(err=>{
                      console.log("There was an error with the put request: ",err)
                  })

              }else if(result.data.userId===false){

                  console.log("Result from the get request is false ")
                  

              }

          }).catch(err=>{

              console.log("There was an error with the get request using the userId: ",err)
              console.log("This is the value of user.sub when the get request return an error: ",user.sub)
              console.log("This is the value of list when the get request returns an error: ",list)
              axios.post("/api/pantry",{userId:user.sub,ingredients:list}).then(result=>{
              
                  //if post request is successful make a axios get request to the tasty api here

                  //setReturnedPostData({result})
                  console.log("This is the data we get back from making a post request: ",result)
              }).catch(err=>{
                  console.log("There was an error with the post request: ",err)
              })

          })


      

  }

  //API call here (post request)
  // return axios.post("/api/pantry",data)
  // }, [count])

  //console.log("Use effect was activated. The count is: ", count);
  //console.log("This is the current userData: ", userData);

  const sendData = () =>{

    postRequest()
    
    //if isAuthenticated is true then check if registered user is 0 or 1 if it's 0 then change it to 1 if it's 1 then don't change anything. -> if it's 1 then dont post, update instead -> logic for 

    
    //***********I'm not making an api call inside the useEffect hook. How will this be a problem later?*****************
   axios.get(`https://tasty.p.rapidapi.com/recipes/list?size=50&q=${list.toString()}&rapidapi-key=de347e5db0msha96abb0356a3c81p10f425jsn336bf5c8e455`).then(response=>{

            setRecipes(response.data.results)
            //why wont this code work if I use recipes in place of response.data.results
            /*
            const recipesFiltered = response.data.results.filter(recipe=> {
                //components.length===list.length && ___
                // nest one if condition inside of another
                filterRecipes(recipe)
                //return recipe.sections
            
            })

            setNewRecipes(recipesFiltered)*/

            //console.log("These are the filtered recipes(newRecipes): ",recipesFiltered)
            
            console.log("These are the recipes unfiltered(recipes): ",recipes)
   
        console.log("This is the result from rapidapi: ",response.data.results)})
        .catch(err=>{
            console.log("There as an error with the axios get request: ",err)
            alert("There may be something wrong with the ingredients you entered")
        })
    

    


    setCount(count+1)
    //console.log("This is the current count state: ",compileFunction)
    setUserData({userId: user.sub, ingredients: list})
    //console.log("This is the current users ingredients list: ",userData.ingredients)
    /*
    const userData = {
        userId: user.sub,
        ingredients: list
    }*/

}





  function deleteItem(id) {
    const newArr = [...list];
    newArr.splice(id, 1);
    console.log(newArr, "delete function");
    setList(newArr);
  }

  return (
    isAuthenticated && (
      <Grid className={classes.containerHeight} container m={3} spacing={1}>
        <Grid m={3} item xs={12} sm={2}>
          <Paper className={classes.paper}>
            <form
              className={classes.TextField}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                inputProps={{ ref: inputRef }}
                xs={12}
                sm={2}
                id="standard-basic"
                label="Ingredients"
              />
            </form>

            <Button variant="contained" color="primary" onClick={sendData}>
              Finish List
            </Button>

            <List dense={true}>
              {list.length > 0
                ? list.map((ingredient, idx) => (
                    <ListItem key={idx} style={{ flexDirection: "row" }}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        style={{overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}}
                        disableTypography
                        primary={
                          <Typography type="body2" style={{ flexShrink: 1 }}>
                            {ingredient}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => deleteItem(idx)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                : null}
              {/* {list.length > 0
                ? list.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => deleteItem(i)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                : null} */}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={7}>
          <Paper className={classes.paper}>
            <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
                <ListSubheader component="div">
                  Recommended Recipes
                </ListSubheader>
              </GridListTile>
              {recipes.map((recipe,i) => (
                <GridListTile key={recipe.thumbnail_url}>
                  <img src={recipe.thumbnail_url} alt={recipe.name} />
                  <GridListTileBar
                    title={recipe.name}
                    subtitle={<span>by: {recipe.user_ratings && recipe.user_ratings.score}</span>}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${recipe.name}`}
                        className={classes.icon}
                      >{console.log(recipe.user_ratings)}
                        <AddIcon color="secondary" onClick={()=>setIndexValue([1,i,recipe.description,recipe.name,recipe.credits[0].name,recipe.thumbnail_url,recipe.instructions])} >
                          Ingredients
                        </AddIcon>

                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            {show &&
              <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={indexValue[3]}
                    subheader={indexValue[4]}
                  />
                  <CardMedia
                    className={classes.media}
                    image={indexValue[5]}
                    title={indexValue[3]}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {indexValue[2] && indexValue[2].split("<")[0]}

                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>
                        {indexValue[6] && indexValue[6][0].display_text}
                      </Typography>
                      <Typography paragraph>
                          blahhhhh
                      </Typography>
                      <Typography paragraph>
                          blahhhh
                      </Typography>
                      <Typography>
                          blahh

                      </Typography>
                    </CardContent>
                  </Collapse>
              </Card>

                        } 
          </Paper>
        </Grid>
      </Grid>
    )
  );
};

export default Mainpage;
