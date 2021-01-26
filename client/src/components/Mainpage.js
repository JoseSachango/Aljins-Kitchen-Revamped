import React, { useRef, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import JSONPretty from "react-json-pretty";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import classes from "*.module.css";
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
// import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
    List,
    ListItem,
    // Avatar,
    // ListItemAvatar,
    ListItemSecondaryAction,
    IconButton,
    // Button,
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
    Button: {
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



// recipeId: recipe.id,
//         title: recipe.name,
//         image: recipe.thumbnail_url,
//         instructions: recipe.instructions.display_text,
//         video: recipe.video_url


const Mainpage = () => {

    const [expanded, setExpanded] = React.useState(false);

const handleExpandClick = () => {
  setExpanded(!expanded);
};

    const { user, isAuthenticated } = useAuth0();

    const classes = useStyles()

    const [list, setList] = useState([]);
    const [count, setCount] = useState(0)
    const [description,setDescription] =useState("")
    const [userData, setUserData] = useState({})
    const [returnedPostData, setReturnedPostData] = useState({})
    const [recipes, setRecipes] = useState([])
    const [show, setShow] = useState(false);
    // const {image, url, ingredients } = recipe.recipe;


    // const [ingredients, setIngredients] = useState([])
    const inputRef = useRef();
    const newlist = list.map(item => item)
    const iduser = userData.userId


    //Explain how we're using inputRef with the textfield 

    const handleSubmit = (event) => {
        event.preventDefault()
        setList([...list, inputRef.current.value]) //Does this syntax mean you're pushing inputRef.current.value onto an array? How is that differnt than merging?Is this a controlled variable
        console.log("This is the current list: ", list)
        console.log("This is the current value in the input field: ", inputRef.current.value)
        inputRef.current.value = '';
    }


   

        const displayRecipe = (arg1) =>{
            setShow(!show)
    
            //setDescription(arg1)
            /*
            axios.post("/api/recipe",{description:arg1}).then(({_id})=>{

                axios.get("/api/recipe/"+_id).then(result=>{
                    console.log("This is the result we get back from the get request: ",result)  
                }).catch(err=> console.log("there was an error with the get request: ",err))

            }).catch(err=>console.log("There was an error with the post request: ",err))*/
    
        }

       

    
    


    //When a user signs in and is not in the database use a post request to add his id to the database. If the user is already in the database don't do anything




    useEffect(() => {

        function postRequest() {

            console.log("Ths value of iduser is :", iduser)

            axios.post("/api/pantry", { userId: iduser, ingredients: newlist }).then(result => {

                //if post request is successful make a axios get request to the tasty api here

                setReturnedPostData({ result })
                console.log("This is the data we get back from making a post request: ", result)
            }).catch(err => {
                console.log("There was an error with the post request: ", err)
            })

        }


        postRequest()

        //API call here (post request)
        // return axios.post("/api/pantry",data)
    }, [count])

    console.log("Use effect was activated. The count is: ", count)
    console.log("This is the current userData: ", userData)


    const sendData = () => {

        //console.log("These are the filtered recipes: ",newRecipes)
        //***********I'm not making an api call inside the useEffect hook. How will this be a problem later?*****************
        axios.get("https://tasty.p.rapidapi.com/recipes/list?rapidapi-key=de347e5db0msha96abb0356a3c81p10f425jsn336bf5c8e455").then(response => {

            setRecipes(response.data.results)

            console.log("This is the result from rapidapi: ", response.data.results)
        })
            .catch(err => { console.log("There as an error with the axios get request: ", err) })

        setCount(count + 1)
        console.log("This is the current count state: ", compileFunction)
        setUserData({ userId: user.sub, ingredients: list })
        console.log("This is the current users ingredients list: ", userData.ingredients)
    }


    return (

        isAuthenticated && (

            <Grid className={classes.containerHeight} container m={3} spacing={1}>

                <Grid m={3} item xs={12} sm={2} >

                    <Paper className={classes.paper}>

                        <form className={classes.TextField} noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField inputProps={{ ref: inputRef }} xs={12} sm={2} id="standard-basic" label="Ingredients" />
                        </form>

                        <Button variant="contained" color="primary" onClick={sendData} >
                            Finish List
                        </Button>


                        <List dense={true}>
                            {
                                list.map((item, i) => <ListItem key={i}>

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
                            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
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
                                            <AddIcon color="secondary" onClick={displayRecipe} >Ingredients</AddIcon>
                                                {/* {show && <RecipeDetails ingredients={ingredients} />} */}
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
  title="recipe name"
  subheader="September 14, 2016"
/>
<CardMedia
  className={classes.media}
  image={recipes[0].thumbnail_url}
  title="Paella dish"
/>
<CardContent>
  <Typography variant="body2" color="textSecondary" component="p">
    Blahhblahh

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
      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
      minutes.
    </Typography>
    <Typography paragraph>
      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
      heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
      browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
      and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
      pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
      saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
    </Typography>
    <Typography paragraph>
      Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
      without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
      medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
      again without stirring, until mussels have opened and rice is just tender, 5 to 7
      minutes more. (Discard any mussels that don’t open.)
    </Typography>
    <Typography>
      Set aside off of the heat to let rest for 10 minutes, and then serve.
    </Typography>
  </CardContent>
</Collapse>
</Card>

                        } 
                    </Paper>
                </Grid>
            </Grid>
        )
    )
}



export default Mainpage







