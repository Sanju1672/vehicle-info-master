import { useRef } from "react";
import { useOutsideClick } from "../hooks/outside-click-hook";

export function CarUsers({ data, onDismiss, model }) {
    const ref = useRef(null);
    useOutsideClick(ref, onDismiss);

    const selectedUsers = data.filter((i) => i.vehicle.model === model)

    return (
        <div className="overlay">
            <div className="sidebar" ref={ref}>
                <h3>Users using - {model}</h3>
                <>
                {selectedUsers.map((user) => <p>{user.userName}</p>)}
                </>
            </div>
        </div>
    )
}