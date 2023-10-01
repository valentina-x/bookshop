import Slide from './Slide';
import Slides from '../Slides.json';

export default class Slider {
	async renderTemplate(): Promise<string> {
		const slidesHTML = await this.addSlidesToHTML();
		return `
			<div class="slider">
				<div class="slider__slides">${slidesHTML}</div>
			</div>
		`;
	}

	addSlidesToHTML() {
		try {
			const slides: Slide[] = Slides as Slide[];
			const slideHTML = slides.map(slide => new Slide(slide).renderTemplate());
			return slideHTML.join('');
		} catch (error) {
			return console.error('Error:', error);
		}
	}

	// async addSlidesToHTML(): Promise<string> {
	// 	try {
    //         const response = await fetch('Slides.json', {
    //             method: 'GET',
    //             headers: {
    //                 accept: 'application/json',
	// 			}
    //         });
    //         if (!response.ok) {
    //             throw new Error(`Error! status: ${response.status}`);
    //         }
	// 		const data = await response.json();
	// 		const slides: Slide[] = data;
	// 		const slideHTMLPromises = slides.map(slide => new Slide(slide).renderTemplate());
	// 		const slideHTMLs = await Promise.all(slideHTMLPromises);
	// 		return slideHTMLs.join('');
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 		return '';
	// 	}
	// }
}