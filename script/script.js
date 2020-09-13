'use strict';

let namePerson = prompt('Введите имя');

let result = namePerson === 'Артем' ? 'директор' : namePerson === 'Максим' ? 'преподаватель' : 'студент';

console.log(result);