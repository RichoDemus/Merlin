import React from "react";

//HOLY SMOKE THIS IS UGLY! LAWL
export const DisplayRole = ({role, friends, lord}) => (
    <div>
        { (() => {
            switch(role) {
                case "GOOD":
                    return (<div>You are a sofie, a goodie!</div>);
                case "EVIL":
                    switch(lord) {
                        case true:
                            return (<div>
                                You are Hitler. Your fellow fascists are:
                                <ul>
                                    {friends.map(friend => (<li>{friend.name}</li>))}
                                </ul>
                            </div>);
                        case false:
                            return (<div>
                                You are a fascist. Your fellow fascists are:
                                <ul>
                                    {friends.filter(friend => friend.lord === false).map(friend => (<li>{friend.name}</li>))}
                                </ul>
                                {friends.filter(friend => friend.lord === true)[0].name} is Hitler!
                            </div>);
                        default:
                            return (<div>Something is wrong...</div>);
                    }
                default:
                    return (<div>Something is wrong...</div>);
            }
        })()}
    </div>
);
