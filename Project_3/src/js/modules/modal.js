
export function openModal(modalSelector,timerId) {
	const modalW = document.querySelector(modalSelector);

	modalW.classList.add('show');
	modalW.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	// document.body.classList.add('overFix');

	if(timerId) {
		clearInterval(timerId);
	}

}

export function closeModal(modalSelector) {
	const modalW = document.querySelector(modalSelector);

	modalW.classList.add('hide');
	modalW.classList.remove('show');
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, timerId) {
	const btnConnectMe = document.querySelectorAll(triggerSelector),
		modalW = document.querySelector(modalSelector);

	btnConnectMe.forEach((item) => {
		item.addEventListener('click', () => openModal(modalSelector, timerId))
	})

	modalW.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == "") {
				closeModal(modalSelector);
		}
});

	// modalW.addEventListener('click', (e) => {
	// 	if (e.target.classList.contains('show') || e.target.classList.contains('modal__close')) {
	// 		closeModal(modalSelector);
	// 	}
	// })

	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show')) { 
				closeModal(modalSelector);
		}
});


	// document.addEventListener('keydown', (e) => {
	// 	if (e.code === 'Escape') {
	// 		closeModal(modalSelector);
	// 	}
	// })

function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector,timerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
