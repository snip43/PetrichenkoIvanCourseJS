let numberOfFilms;

personalMovieDB.start();

const personalMovieDB = {
	count: 0,
	movies: {},
	actors: {},
	genres: [],
	privat: true,
	start: () => {
		while (	personalMovieDB.count == '' || 	personalMovieDB.count == null || isNaN(	personalMovieDB.count))
		personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели ? ', '');
	},
	rememberMyFilms: () => {
		for (let i = 1; i <= 2; i++) {
			const a = prompt('Один из последних просмотренных фильмов?', '');
			b = prompt('На сколько оцените его ? ', '');
			if (a != null && b != null && a != '' && b != '' && a.length < 50) {
				personalMovieDB.movies[a] = b;
			} else {
				i--;
			}
		}
	},
	writeYourGenres: () => {
		for (let i = 1; i <= 3; i++) {
			let question = prompt(`Ваш любимый жанр под номером ${i} ?`, '');
			if (question == null || question == '') {
				i--;
			} else {
				personalMovieDB.genres.push(question);
			}
		}
		personalMovieDB.genres.forEach((item, index) => {
			console.log(`Любимый жанр #${index+1} - это ${item}`)
		})
	},
	detectPersonalLevel: () => {
		if (personalMovieDB.count < 10) {
			alert('Просмотрено довольно мало фильмов')
		} else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
			alert('Вы классический зритель')
		} else if (personalMovieDB.count) {
			alert('Вы киноман')
		} else {
			alert('Произошла ошибка')
		}
	},
	showMyDB: () => {
		if (!personalMovieDB.privat) {
			console.log(personalMovieDB)
		}
	},
	toggleVisibleMyDB: () => {
		if (personalMovieDB.privat) {
			personalMovieDB.privat = false;
		} else {
			personalMovieDB.privat = true;
		}
	}
}

personalMovieDB.toggleVisibleMyDB();
//-------------------- Решение с помощью for -----------------------------
personalMovieDB.rememberMyFilms();
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


personalMovieDB.writeYourGenres();
personalMovieDB.detectPersonalLevel();
personalMovieDB.showMyDB();








