import LocalStorage from "./LocalStorage";

export default class Buy {
	private isBookAddedToCart: boolean;
	private items: Array<any> | undefined;
	private id: number | undefined;

	constructor(isItemAddedToCart: boolean, items?: Array<any>, id?: number) {
		this.isBookAddedToCart = isItemAddedToCart;
		this.items = items;
		this.id = id;
	}

	public getCurrentBook(id: number) {
		const parentBuyID: number = id;
		const currentBook = this.items?.find(item => item.id === parentBuyID);
		return currentBook;
	}

	public addToLocalStorage () {
		const currentBook = this.getCurrentBook(this.id as number);
		if (currentBook) {
			new LocalStorage().setBooks(currentBook);
			new LocalStorage().counterBooks();
		} else {
			console.error('Книга не найдена');
		}
	}

	public addEventToBuyButton() {
		const button = document.querySelector('.book__buy');
		if (button) {
			button.addEventListener('click', () => this.addToLocalStorage());
		}
	}

	render() {
		new LocalStorage().counterBooks();
		const buttonTemplate = `<button class="book__buy${this.isBookAddedToCart ? ' disabled' : ''}">${this.isBookAddedToCart ? 'In the cart' : 'Buy now'}</button>`;
	
		return buttonTemplate;
	}
}