import React from "react";

const EditButton = (model: any) => {
    return (
        <i className="bi bi-pencil-square me-2" role="button" {...model}></i>
    );
}

export default EditButton;