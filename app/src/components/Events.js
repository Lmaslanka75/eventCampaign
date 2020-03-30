
import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Pagination from '../components/Pagination';
import DemoApp from './Maps';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        margin: '18px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        zIndex: '-1',
        'overflow-y': 'visable',
        display: 'inline-block',
        padding: '0'
    },
    columns: {
        columnWidth: "320px",
        columnGap: "15px",
        width: "90 %",
        maxWidth: "1100px",
        margin: "50px auto",
        paddingBottom: '2em',
        height: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    featuredImg: {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        position: "relative"
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

    title: {
        fontFamily: 'Lato',
        fontWeight: 400,
        fontSize: '1em',
        font: 'Bellota Text',
        textTransform: 'uppercase',
        paddingBottom: '1em'
    },
    description: {
        overflow: 'scroll'
    },
    cardContent: {
        padding: '6px'
    }
}));

export default function Events() {
    //CSS Styles
    const classes = useStyles();

    //Creating an Array to store the payload response
    const [results, setResults] = useState([]);

    //loading condition for before the fetch call
    const [loading, setLoading] = useState(false);

    //variables to collapse for more details
    const [expanded, setExpanded] = useState({});

    /****** State variables for Pagination Functionality *******/
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // Get current posts/events
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const [locations, setLocations] = useState();

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleExpandClick = (id) => e => {
        setExpanded({
            ...expanded,
            [id]: !expanded[id]
        });
    }

    useEffect(
        () => {
            async function fetchData() {
                try {
                    setLoading(true);
                    const response = await fetch(
                        'https://api.mobilize.us/v1/events?per_page=200&timeslot_start=gte_now&*zipcode=19003&maxdistance=2&exclude_full=true');
                    const json = await response.json();
                    setPosts(json.data); //Set the events data from the json
                    setResults(json);   //use the entire response to get "next", and "count"
                    // const places = getLocations(json.data);
                    // setLocations(places);

                } finally {
                    setLoading(false);
                }
            }

            fetchData();
        }, []);

    // const getLocations = () => {
    //     posts.map(item => {
    //         try {
    //             let array = [];
    //             if (item.location.location) {
    //                 return array.push(item.location.location);
    //             }
    //             else {
    //                 return;
    //             }
    //             return setLocations(array);
    //         }
    //         catch (error) {
    //             console.log(error);
    //         }
    //         return;
    //     }
    //     );
    // }

    return (
        <>
            <Container >
                {/* Google Map */}
                {/* <DemoApp markers={locations}></DemoApp> */}

                <div className={classes.columns}>
                    {/* Map the allocated events per page (currentPosts =  events perPage limit) */}
                    {currentPosts.map((item) => (

                        <Card className={classes.root} key={item.id} >
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                src={item.featured_image_url}
                                title={item.title}
                                media="img"
                                className={classes.featuredImg}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography display="block" component="h1" className={classes.title}>
                                    {item.title}
                                </Typography>

                                {/* Showing all of the Dates available did not look good, so I chose 1 date */}
                                <Typography variant="overline text" component="p" variant="subtitle2">
                                    {new Date((item.timeslots[item.timeslots.length - 1].start_date) * 1000).toUTCString()}
                                </Typography>
                            </CardContent>

                            <CardActionArea>
                                {/* Expand Icon */}
                                <Typography component="h3" variant="caption">
                                    Description
                                </Typography>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={handleExpandClick(item.id)}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    id={item.id}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>

                                {/* Description Collapsed */}
                                <Collapse in={expanded[item.id]} timeout="auto" unmountOnExit key={item.id} >
                                    <CardContent>
                                        <Typography>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </CardActionArea>

                        </Card>
                    ))}
                </div>


            </Container>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />


        </>

    );
}