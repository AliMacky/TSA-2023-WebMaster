import React from "react";
import earth from "../assets/earth.gif";

const Loading = () => {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "black",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: "24px",
            }}
        >
            <img
                src={earth}
                style={{
                    height: "180px",
                    width: "180px",
                    marginBottom: "8px",
                }}
            />
            Loading...
        </div>
    );
};

export default Loading;
