import React from "react";

export const calculateRotation = (temp, pos, lookAt) => {
    temp.current.position.copy(pos);
    temp.current.lookAt(lookAt);
    return temp.current.rotation;
};
