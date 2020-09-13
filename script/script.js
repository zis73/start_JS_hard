"use strict";
// ДЗ 9
const timeOne = document.querySelector('.time-one'),
    timeTwo = document.querySelector('.time-two');

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const hourTransformation = item => {
        if (item === 1 || item === 21) {
            return 'час';
        } else if (item === 0 || (item > 4 && item < 21)) {
            return 'часов';
        } else {
            return 'часа';
        }
    },
    minuteTransformation = item => {
        if (item % 10 === 1 && item !== 11) {
            return 'минута';
        } else if ((item % 10 > 1 && item % 10 < 5) && (item < 10 || item > 20)) {
            return 'минуты';
        } else {
            return 'минут';
        }
    },
    secondTransformation = item => {
        if (item % 10 === 1 && item !== 11) {
            return 'секунда';
        } else if ((item % 10 > 1 && item % 10 < 5) && (item < 10 || item > 20)) {
            return 'секунды';
        } else {
            return 'секунд';
        }
    },
    addZero = item => item < 10 ? '0' + item : item,
    renderTime = () => {
        let date = new Date();

        let today = (date.getDay() !== 0) ? (date.getDay() - 1) : 6;


        timeOne.textContent = `Сегодня ${week[today]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} года, ${date.getHours()} ${hourTransformation(date.getHours())}  ${date.getMinutes()} ${minuteTransformation(date.getMinutes())} ${date.getSeconds()} ${secondTransformation(date.getSeconds())} `;

        timeTwo.textContent = `${addZero(date.getDate())}.${addZero(date.getMonth())}.${date.getFullYear()}  - ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;

    };

setInterval(renderTime, 1000);