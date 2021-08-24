import React from "react";

const DeleteButton = (props: any) => {
    return (
        <i className="bi bi-trash-fill" role="button" {...props}></i>
    );
}

export default DeleteButton;