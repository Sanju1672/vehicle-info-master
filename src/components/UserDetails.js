import { useRef } from "react"
import { useOutsideClick } from "../hooks/outside-click-hook";

export function UserDetails({ user: { userName, phone, occupation, email, age, address: { street, city, state, country }}, onDismiss}) {
    const ref = useRef(null);
    useOutsideClick(ref, onDismiss);
    return (
        <div className="overlay">
            <div className="sidebar" ref={ref}>
                <h3>User Details :-</h3>
                <p>{userName}</p>
                <p>{phone}</p>
                <p>{occupation}</p>
                <p>{email}</p>
                <p>{age}</p>
                <p>{street}</p>
                <p>{city}</p>
                <p>{state}</p>
                <p>{country}</p>
            </div>
        </div>
    )
}