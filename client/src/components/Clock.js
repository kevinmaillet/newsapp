import React, { useEffect, useState } from 'react';

const Clock = () => {
    const [seconds, setSeconds] = useState(new Date().getSeconds());
    const [minutes, setMinutes] = useState(new Date().getMinutes());
    const [hours, setHours] = useState(((new Date().getHours() % 12) === 0 ? 12 : new Date().getHours() % 12));
    const [zeroSecond, setZeroSecond] = useState(false)
    const [zeroMinute, setZeroMinute] = useState(false)
    const [zeroHour, setZeroHour] = useState(false)
    const [format, setFormat] = useState(new Date().getHours() < 12 ? 'AM' : 'PM')


    useEffect(() => {

        if (seconds < 10) {
            setZeroSecond(true);
        } else {
            setZeroSecond(false)
        }

        if (minutes < 10) {
            setZeroMinute(true);
        } else {
            setZeroMinute(false)
        }

        if (hours < 10) {
            setZeroHour(true);
        } else {
            setZeroHour(false)
        }

        const secondTimer = setInterval(() => {
            if (seconds < 59) {
                setSeconds(seconds + 1)
                // setMinutes(new Date().getMinutes())
            } 
            else {
                setSeconds(0)
                setMinutes(new Date().getMinutes())
                setHours(((new Date().getHours() % 12) === 0 ? 12 : new Date().getHours() % 12))
                setFormat(new Date().getHours() < 12 ? 'AM' : 'PM');
            }
        },1000)


       return () => {
            clearInterval(secondTimer)
        }
    }, [hours, minutes, seconds])

    const isZeroSecond = zeroSecond ? 0 : "";
    const isZeroMinute = zeroMinute ? 0 : "";
    const isZeroHour = zeroHour ? 0 : "";


    return <span className="clock">
        {`${isZeroHour}${hours}:${isZeroMinute}${minutes}:${isZeroSecond}${seconds} ${format}`}
        </span>
}

export default Clock;