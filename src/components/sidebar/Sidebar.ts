import API from "../books/API";
import Books from "../books/Books";

export default class Sidebar {
	private sidebarContainer;
	private links;
	private booksContainer;

	constructor() {
		this.sidebarContainer = document.querySelector('.sidebar') as HTMLElement;
		this.links = this.sidebarContainer.querySelectorAll('.sidebar__link');
		this.booksContainer = document.querySelector('#books') as HTMLElement;
	}

	public addListenerToLink(): void {
		this.links.forEach(link => {
			link.addEventListener('click', this.toggleActiveLink);
		})
	}

	private toggleActiveLink = (event: Event): void => {
		event.preventDefault();
		const target: HTMLElement = event?.target as HTMLElement;
		this.links.forEach(link => {
			link.classList.remove('active');
		})
		if (!target.classList.contains('active')) {
			target.classList.add('active');
		}
		this.loadBooks(target);
	}

	private async loadBooks(target: HTMLElement) {
		this.booksContainer.innerHTML = '';
		const subject = target.getAttribute('href')?.substring(1) as string;
		const url = new API().getURL(subject, 0, 6);
		const booksDataSidebar: Promise<{ items: Array<any> }> = new API().getDataBooks(url);
		new Books().loadBooks(booksDataSidebar);
	}
}