import BuyButton from "./Buy";

export default class Book {
	private title: string;
	private image: string;
	private amount: number;
	private currencyCode: string;
	private saleability: string;
	private description: string;
	private authors: [];
	private book_id: number;
	private averageRating: number;
	private pageCount: number;

	constructor(book: any) {
		this.book_id = book.id;
		this.title = book.volumeInfo.title;
		this.image = book.volumeInfo.imageLinks?.thumbnail; // url
		this.description = book.volumeInfo.description;
		this.authors = book.volumeInfo.authors;

		this.amount = book.saleInfo.listPrice?.amount; // price
		this.currencyCode = book.saleInfo.listPrice?.currencyCode; // RUB $$$ EUR

		this.saleability = book.saleInfo.saleability; // "FOR_SALE" "NOT_FOR_SALE" "FREE"

		this.averageRating = book.volumeInfo.averageRating // rating 1-5
		this.pageCount = book.volumeInfo.pageCount // number of views
	}

	private getAuthors(): [] | string {
		if (typeof this.authors !== 'undefined' && Array.isArray(this.authors)) {
			if (this.authors.length > 0) {
				return this.authors.slice().join(', ');
			} else {
				return this.authors;
			}
		}
		return '';
	}

	private renderStars(rating: number): string {
		const filledStar = '★';
		const emptyStar = '☆';
		const fullStars = filledStar.repeat(Math.floor(rating));
		const halfStar = (rating % 1) >= 0.5 ? filledStar : '';
		const emptyStars = emptyStar.repeat(5 - Math.ceil(rating));
		return `${fullStars}${halfStar}${emptyStars}`;
	}

	private formatViews(views: number) {
		if (views >= 1000000) {
			return (views / 1000000).toFixed(1) + 'M';
		} else if (views >= 1000) {
			return (views / 1000).toFixed() + 'K';
		} else {
			return views.toString();
		}
	}

	render() {
		const bookTemplate = `
			<div class="book" id="${this.book_id}">
				<img class="book__image" src="${this.image ? this.image : 'images/books/empty.jpg'}" alt="book-image" width="212" height="300" />
				<div class="book__info">
					<div class="book__authors">${this.getAuthors()}</div>
					<div class="book__title">${this.title}</div>
					<div class="book__rating">
						<div class="book__rating-averageRating${!this.averageRating ? ' hidden' : ''}">${this.renderStars(this.averageRating)}</div>
						<div class="book__rating-ratingsCount${!this.pageCount ? ' hidden' : ''}">${this.pageCount ? this.formatViews(this.pageCount) + ' review' : ''}</div>
					</div>
					<div class="book__description${!this.description ? ' hidden' : ''}">${this.description}</div>
					<div class="book__retailPrice${this.saleability != "FOR_SALE" ? ' hidden' : ''}">${this.saleability == "FOR_SALE" ? (this.currencyCode + ' ' + this.amount) : this.saleability}</div>
			
				</div>
			</div>
		`;

		return bookTemplate;
	}
}

// ${new BuyButton(false, this.booksData, this.book_id).render()}