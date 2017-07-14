import React from "react";

export const DisplayRole = ({role, friends}) => (
    <div>
        Role: {role} friends: {JSON.stringify(friends)}
    </div>
);
