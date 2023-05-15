import React from "react"

function ErrorMessage(text) {
    return (
        <div className="error-message">
            {text}
        </div>
    )
}

export { ErrorMessage }

function addZero(num) {
    if (num < 10) return '0' + num;
    else return num
}

function createDate(timestamp) {
    let date = new Date(timestamp);

    let year = addZero(date.getFullYear());
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());

    return `${hours}:${minutes} ${day}.${month}.${year}`
}

export { createDate }