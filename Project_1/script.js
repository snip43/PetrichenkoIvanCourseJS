let numberOfFilms;

function start() {
	while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms))
		numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели ? ', '');
}
start();

const personalMovieDB = {
	count: numberOfFilms,
	movies: {},
	actors: {},
	genres: [],
	privat: false
}



//-------------------- Решение с помощью for -----------------------------

function rememberMyFilms() {
	for (let i = 1; i <= 2; i++) {
		const a = prompt('Один из последних просмотренных фильмов?', '');
		b = prompt('На сколько оцените его ? ', '');

		if (a != null && b != null && a != '' && b != '' && a.length < 50) {
			personalMovieDB.movies[a] = b;
			console.log('done');
		} else {
			console.log('error');
			i--;
		}
	}
}

rememberMyFilms();


// -------------------------------------------------------------------------

//---------------------------Решение с помощью do...while -------------------------
// let i=0;
// do {
// 	const a = prompt('Один из последних просмотренных фильмов?', '');
// 				b = prompt('На сколько оцените его ? ', '');

// 	if (a != null && b != null && a != '' && b != '' && a.length < 50) {
// 		personalMovieDB.movies[a] = b;
// 		i++;
// 	} else {
// 		i--;
// 	}
// } while(i < 2)

//------------------------------------------------

//---------------------------Решение с помощью while -------------------------
// let i = 0;
// while (i < 2) {
// 	const a = prompt('Один из последних просмотренных фильмов?', '');
// 	b = prompt('На сколько оцените его ? ', '');

// 	if (a != null && b != null && a != '' && b != '' && a.length < 50) {
// 		personalMovieDB.movies[a] = b;
// 		i++;
// 	} else {
// 		i--;
// 	}
// }
	

//------------------------------------------------

// 3 раза отвечаем на вопрос и записываем результаты в массив genres
function writeYourGenres() {
	let NumberLoveGenres;
	for (let i = 1; i <= 3; i++) {
		personalMovieDB.genres.push(prompt(`Ваш любимый жанр под номером ${i} ?`, ''));
	}
}

writeYourGenres();
//-----------------------------

function detectPersonalLevel() {
	if (personalMovieDB.count < 10) {
		alert('Просмотрено довольно мало фильмов')
	} else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
		alert('Вы классический зритель')
	} else if (personalMovieDB.count) {
		alert('Вы киноман')
	} else {
		alert('Произошла ошибка')
	}
}

detectPersonalLevel();

// Если в privat стоит false - выводим базу данных в консоль
function showMyDB() {
	if (!personalMovieDB.privat) {
		console.log(personalMovieDB)
	}
}
showMyDB();





