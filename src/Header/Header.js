import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

export default function Header() {
    return (
        <div className="header">
            <FontAwesomeIcon icon={faComments} size='2x' />
            <h1>Chat WhatsApp</h1>
        </div>
    )
}

