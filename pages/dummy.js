import React from "react";

function dummy() {
    const name = {
        firstname: "chetan",
        lastname: "N",
    };

    const formatName = (name) => {
        return <p>{name.firstname + " " + name.lastname}</p>;
    };
    return (
        <div>
            <h1>Welcome to React.js tutorial</h1>
            {formatName(name)}
        </div>
    );
}

export default dummy;
