import React from "react";

export const DisplayRole = ({team, role, friends}) => (
    <div>
        <p>Team: {team}</p>
        <p>Role: {role}</p>
        <p>Team members you are aware of:</p>
        <ul>
            {friends.map(friend => (<li>{friend.name} is {friend.role}</li>))}
        </ul>
    </div>
);
