function tabs(tabsSelector,tabsContentSelector,tabsParentSelector,activeClass){
	const tabs = document.querySelectorAll(tabsSelector),
	tabsContent = document.querySelectorAll(tabsContentSelector),
	parentTabs = document.querySelector(tabsParentSelector);
	
	function hideTabContent() {
	tabsContent.forEach(item => {
		item.classList.add('hide');
		item.classList.remove('show', 'fade');
	})
	
	tabs.forEach(item => {
		item.classList.remove(activeClass);
	})
	}
	
	function showTabsContent(i = 0) {
	tabsContent[i].classList.add('show', 'fade');
	tabsContent[i].classList.remove('hide');
	tabs[i].classList.add(activeClass);
	}
	
	hideTabContent();
	showTabsContent();
	
	parentTabs.addEventListener('click', (e) => {
	
	const target = e.target;
	
	tabs.forEach((item, i) => {
		if (target == item && !target.classList.contains(activeClass)) {
			hideTabContent();
			showTabsContent(i);
		}
	})
	})
}
	
export default tabs;