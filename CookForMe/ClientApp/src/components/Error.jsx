import React, { Component } from 'react';

export class Error extends Component {

    render() {
        return (
            <div className="error">
                {console.log(this.props.message)}
                {
                   this.props.messages.map((message, index) => (
                        <p key={index}>{message}</p>
                    ))
                }
            </div>
        )
    }

}

