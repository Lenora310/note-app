import React from 'react'
export const Book = (props) => {
    return (
        <div>
            <h1>I am a book with id {props.match.params.id} </h1>
        </div>
    )
}
