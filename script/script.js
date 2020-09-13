//Задача №1
let lang = prompt('Введите название языка (ru/eng)');

const arrLang = [];
arrLang['ru'] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
arrLang['en'] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

if(lang === 'ru') {
  alert('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
}else if (lang === 'en') {
  alert('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
}else {
  alert('что-то ввел не то');
}

switch(lang) {
  case 'ru':
    alert('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
    break;
  case 'en':
    alert('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
    break;
  default:
    alert('Что-то не то ввел');
}

console.log(arrLang[lang]);

Заданик №2

let namePerson = prompt('Введите имя')

let result = namePerson === 'Артем' ? 'директор' : namePerson === 'Максим' ? 'преподаватель' : 'student';

alert(result);