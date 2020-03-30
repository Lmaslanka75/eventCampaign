import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({

    pagination: {
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'center'

    },
    pageItem: {
        display: 'list-item',
        listStyleType: 'none',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        "color": "rgba(0, 0, 0, 0.87)",
        "height": "32px",
        "margin": "0 3px",
        "padding": "0 6px",
        "fontSize": "0.875rem",
        "minWidth": "32px",
        "boxSizing": "border-box",
        "textAlign": "center",
        "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        "fontWeight": "600",
        "lineHeight": "1.43",
        "borderRadius": "4px",
        "letterSpacing": "0.01071em"
    },
    pageNumber: {
        textDecoration: 'none',
        display: 'in-line-flex',
        'vertical-align': 'middle'
    }
}
));


const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    //CSS Styles 
    const classes = useStyles();
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={classes.pagination} >
                {pageNumbers.map(number => (
                    <li key={number} className={classes.pageItem}>
                        <a className={classes.pageNumber} onClick={() => paginate(number)} href='!#'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;