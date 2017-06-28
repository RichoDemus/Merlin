import React from 'react'
import Fetch from "react-fetch";
import TextFromPropsComponent from "./TextFromPropsComponent";

export default class FetchFromBackend extends React.Component{
    render() {
        return (
            <Fetch url={`http://${window.location.hostname}:8080`}>
                <TextFromPropsComponent/>
            </Fetch>
        );
    }
}
