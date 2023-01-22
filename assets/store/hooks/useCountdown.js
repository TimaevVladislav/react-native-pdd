import {useEffect, useState} from 'react'

const useCountdown = () => {

}















//
// const THREE_DAYS_IN_MS = 20 * 60 * 1000;
// const NOW_IN_MS = new Date().getTime();
//
// export const dateTime = NOW_IN_MS + THREE_DAYS_IN_MS;
//
//
// const useCountdown = (targetDate) => {
//
//     const countDownDate = new Date(targetDate).getTime()
//
//     const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())
//
//
//     useEffect(() => {
//         let interval = setInterval(() => {
//             setCountDown(countDownDate - new Date().getTime())
//         }, 1000);
//
//         return () => clearInterval(interval)
//
//     }, [countDownDate])
//
//     return getReturnValues(countDown, setCountDown)
// };
//
//
// const getReturnValues = (countDown, setCountDown) => {
//
//
//     const minutes = Math.floor((countDown % (1)) / (1 * 60))
//     const seconds = Math.floor((countDown % (1000 * 60)) / 1000)
//
//
//     return [minutes, seconds, countDown, setCountDown]
// };
//
//
// export { useCountdown };
