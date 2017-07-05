import React from "react";

export const ListUsers = ({users}) => (
    <div>
        <strong>Players in room</strong>
        <ul>
            {users.map(user => user.name).map(name => (<li>{name}</li>))}
        </ul>
    </div>
);
