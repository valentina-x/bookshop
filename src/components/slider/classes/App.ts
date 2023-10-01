import Navigation from './Navigation';
import Slider from "./Slider";

export default class App {
	private slider;
	private container;
	private navigation;

	constructor() {
		this.container = document.getElementById('slider') as HTMLElement;
		this.slider = new Slider();
		this.navigation = new Navigation();
	}

	public init(): void {
		// render slider's html template
		insertSlider(this.container, this.slider, this.navigation);

		async function insertSlider(container: HTMLElement, slider: Slider, navigation: Navigation) {
			container.insertAdjacentHTML('afterbegin', await slider.renderTemplate());
			// render navigation
			insertNavigation(container, navigation);
		}

		async function insertNavigation(container: HTMLElement, navigation: Navigation) {
			const sliderHTMLContainer: HTMLElement = container.querySelector('.slider') as HTMLElement;
			const slidesHTML: NodeListOf<Element> = sliderHTMLContainer.querySelectorAll('.slider__slide');
			sliderHTMLContainer.insertAdjacentHTML('afterbegin', await navigation.renderTemplate(slidesHTML.length));
			
			navigation.switchActiveElements(container, slidesHTML.length);

			// true - autoplay on
			navigation.autoPLaySlider(true, container, slidesHTML.length);
		}
	}
}