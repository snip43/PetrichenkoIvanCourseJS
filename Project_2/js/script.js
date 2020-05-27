/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */


'use strict';

document.addEventListener('DOMContentLoaded', ()=> {
	const movieDB = {
    movies: [
				"Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const reklamaBlock = document.querySelector('.promo__adv');
const promo__genre = document.querySelector('.promo__genre');
const content = document.querySelector('.promo__content')
const bgg = content.querySelector('.promo__bg');
const interactive_list = document.querySelector('.promo__interactive-list');

reklamaBlock.remove();
promo__genre.innerHTML = 'ДРАМА'
bgg.style.backgroundImage = 'url("/Project_2/img/bg.jpg")';

function addMoviesToDom() {
	movieDB.movies.sort();
	interactive_list.innerHTML = '';
	movieDB.movies.forEach((film, index) => {
		interactive_list.innerHTML += `
			<li class="promo__interactive-item">${ index + 1}. ${film}
						<div class="delete"></div>
			</li>
	`;
	});
}

addMoviesToDom();

//--------------3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)------------
interactive_list.addEventListener('click',(e) => {
	if(e.target.className == 'delete') {
		e.target.parentElement.remove();
	}
})
//------------------------------------
const addForm = document.querySelector('form.add')
const inputValue = addForm.querySelector('input[type="text"]');
const btn = addForm.querySelector('button');

	addForm.addEventListener('submit', (e) => {
		e.preventDefault();
	})

//---------------- 4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
//------------------- "Добавляем любимый фильм"
const checkedBox = () => {
	const inputCheckbox = document.querySelector('input[type="checkbox"]');
	if(inputCheckbox.checked) {
		console.log('Добавляем любимый фильм!');
	}
}
//-------------------------------------------------------------------------------

const pushItemAndSort = item => {
	movieDB.movies.push(item);
	movieDB.movies.sort();
}

//----------------1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
//---------------- новый фильм добавляется в список. Страница не должна перезагружаться.
//---------------- Новый фильм должен добавляться в movieDB.movies.

btn.addEventListener('click', (e)=> {
	e.preventDefault();
	checkedBox();
	let itemFilm = inputValue.value;
	//-----------------2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки-------
	if(itemFilm != '' && itemFilm.length >= 21) {     
		let newItemFilm = `${itemFilm.slice(0,21)}...`;
		pushItemAndSort(newItemFilm);     // 5) Фильмы должны быть отсортированы по алфавиту */
		addMoviesToDom();
	} else if(itemFilm != ''){
		pushItemAndSort(itemFilm)
		addMoviesToDom();
	}
})
//----------------------------------------
})









