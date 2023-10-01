export default class Slide {
	public id: number;
	public title: string;
	public description: string;
	public imageURL: string;
	public link: string;

	constructor(slide: { id: number, title: string, description: string, imageURL: string, link: string }) {
		this.id = slide.id;
		this.title = slide.title;
		this.description = slide.description;
		this.imageURL = slide.imageURL;
		this.link = slide.link;
	}

	renderTemplate(): string {
		return `
			<div class="slider__slide${this.id === 0 ? ' active' : ''}" data-index="${this.id}">
				<!--<div class="slider__slide-info">
					<div class="slider__slide-title">${this.title}</div>
					<div class="slider__slide-text">${this.description}</div>
					<a class="slider__slide-button" href="${this.link}" target="_blank">Текст кнопки</a>
				</div>-->
				<div class="slider__slide-image"><img src="${this.imageURL}" alt="img" width="940" height="860"></div>
			</div>
		`;
	}
}