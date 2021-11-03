import React, { Component } from 'react'

export default class Page extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <h1>{this.props.pageName} {this.props.pageNumber}</h1>
                <h3>Date</h3>
                <h3>City</h3>
                <h3>Weather</h3>
                <h3>Note</h3>
                <h3>Photo</h3>
            </div>
        )
    }
}
