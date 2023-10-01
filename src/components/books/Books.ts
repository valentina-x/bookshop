import API from "../books/API";
import Book from "../books/Book";
import Buy from "../books/Buy";
import LocalStorage from "../books/LocalStorage";

export default class Books {
	private booksContainer;
	public defaultSubject: string;
	private apiInstance: API;

	constructor() {
		this.booksContainer = document.querySelector('#books') as HTMLElement;
		this.defaultSubject = 'Architecture';
		this.apiInstance = new API();
	}

	public loadBooks(booksData: Promise<{ items: Array<any> }>) {
		const buttonLoadMore = document.querySelector('.booksload') as HTMLElement;
		booksData.then((data) => {
			const items = data.items;
			this.addBooksToHTML(items);
		})
		.then(() => {
			if (!buttonLoadMore) {
				this.booksContainer?.insertAdjacentHTML('beforeend', this.addLoadButtonToHTML());
				this.addListenerToButton();
			}
		})
		.then(() => {
			new LocalStorage().showBooksFromLocalStorage();		
		})
		.then(() => {
			new LocalStorage().counterBooks();
		})
		.catch(error => {
			console.error(error);
		});
	}

	public loadDefaultSubject() {
		const url = this.apiInstance.getURL(this.defaultSubject, 0, 6);
		const booksDataDefault: Promise<{ items: Array<any> }> = this.apiInstance.getDataBooks(url);
		this.loadBooks(booksDataDefault);
	}

	private loadMoreBooks = () => {
		const activeLink = document.querySelector('.sidebar__link.active') as HTMLElement;
		const currentSubject = activeLink.getAttribute('href')?.substring(1) as string;
		const maxBooksNow: NodeListOf<Element> = this.booksContainer.querySelectorAll('.book');
		enum LazyLoad {
			StartIndex = 0,
			MaxResult = +maxBooksNow.length,
			Step = 6,
		}
		const url = this.apiInstance.getURL(currentSubject, LazyLoad.StartIndex + LazyLoad.Step, LazyLoad.MaxResult);
		const booksDataLoadMore: Promise<{ items: Array<any> }> = this.apiInstance.getDataBooks(url);
		this.loadBooks(booksDataLoadMore);
	}

	private addBooksToHTML(items: Array<any>) {
		items.forEach(book => {
			this.booksContainer.insertAdjacentHTML('beforeend', new Book(book).render());
			const bookHTML = document.getElementById(book.id) as HTMLElement;
			if (bookHTML) {
				const buyButton = bookHTML.querySelector('.book__buy') as HTMLElement;
				if (buyButton) {
					buyButton.addEventListener('click', () => new Buy(false, items, book.id).addToLocalStorage());
				} else {
					const bookInfo = bookHTML.querySelector('.book__info') as HTMLElement;
					if (bookInfo) {
						bookInfo.insertAdjacentHTML('beforeend', new Buy(false, items).render());
						const newBuyButton = bookHTML.querySelector('.book__buy') as HTMLElement;
						if (newBuyButton) {
							newBuyButton.addEventListener('click', () => new Buy(false, items, book.id).addToLocalStorage());
						}
					}
				}
			}
		});
	}
	

	public addLoadButtonToHTML(): string {
		return `<button class="booksload">Load more</button>`
	}

	public addListenerToButton(): void {
		const buttonLoadMore = document.querySelector('.booksload') as HTMLElement;
		buttonLoadMore.addEventListener('click', this.loadMoreBooks);
	}
}