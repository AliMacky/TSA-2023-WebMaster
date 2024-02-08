import React from "react";
import gsap from "gsap";

export const smoothAnimation = (camera, targetPos, targetRot) => {
    gsap.to(camera.position, {
        duration: 1,
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        ease: "power3.inOut",
    });
    gsap.to(camera.rotation, {
        duration: 1,
        x: targetRot.x,
        y: targetRot.y,
        z: targetRot.z,
        ease: "power3.inOut",
    });
};
