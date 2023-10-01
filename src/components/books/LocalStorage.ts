import BuyButton from './Buy'

export default class LocalStorage {

	private getBooks() {
		const getData: string = localStorage.getItem("books") || "[]";
		if (getData != 'undefined') {
			return JSON.parse(getData);
		} else {
			return [];
		}
	}

	public setBooks(currentBook: any) {
		const bookArr: Array<any> = this.getBooks();
		const currBook = document.getElementById(currentBook.id) as HTMLElement;
		const currBookInfo = currBook.querySelector('.book__info') as HTMLElement;

		if (bookArr.length === 0) {
			currBookInfo.querySelector('.book__buy')?.remove();
			currBookInfo.insertAdjacentHTML('beforeend', new BuyButton(true).render());
			return localStorage.setItem('books', JSON.stringify([currentBook]));
		} else {
			bookArr.forEach(bookFormLS => {
				if (bookFormLS.id === currentBook.id) {
					return;
				}		
			});

			bookArr.push(currentBook);
			
			localStorage.setItem("books", JSON.stringify(bookArr));
			currBookInfo.querySelector('.book__buy')?.remove();
			currBookInfo.insertAdjacentHTML('beforeend', new BuyButton(true).render());
		}
	}

	public showBooksFromLocalStorage(): void {
		const bookArr: Array<any> = this.getBooks();
		if (bookArr.length > 0) {
			bookArr.forEach(bookFormLS => {
				const bookElement = document.getElementById(bookFormLS.id) as HTMLElement;
				if (bookElement) {
					const buyButtonElement = bookElement.querySelector('.book__buy') as HTMLElement;
					if (buyButtonElement) {
						buyButtonElement.remove();
						const bookInfoElement = bookElement.querySelector('.book__info') as HTMLElement;
						bookInfoElement.insertAdjacentHTML('beforeend', new BuyButton(true).render());
					}
				}
			});
		}
	}

	public counterBooks = (): void => {
		const basket = document.querySelector('.header__button--basket span') as HTMLElement;
		const bookArr: Array<any> = this.getBooks();
		basket.innerHTML = '';
		basket.innerHTML = (bookArr.length).toString();
	}
}