import React from 'react';

export const Page = (props) => {

    if(props.isCover){
        return (
            <div>
                <h2>I am your book cover</h2>
            </div>
        )
    }

    return (
        <div>
            <h1>{props.pageName} {props.pageNumber}</h1>
            <h3>Date</h3>
            <h3>City</h3>
            <h3>Weather</h3>
            <h3>Note</h3>
            <h3>Photo</h3>
        </div>
    )
}

