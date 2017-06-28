import React from "react";

export default class TextFromPropsComponent extends React.Component{
    render(){
        console.log(this.props);
        return <p>{this.props.message}</p>
    }
}
