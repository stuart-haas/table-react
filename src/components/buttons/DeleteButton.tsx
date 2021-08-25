import React from "react";

const DeleteButton = (model: any) => {
    return (
        <i className="bi bi-trash-fill" role="button" {...model}></i>
    );
}

export default DeleteButton;