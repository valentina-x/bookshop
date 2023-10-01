export default class Navigation {
	async renderTemplate(maxSlides: number): Promise<string> {
		const dotsHTML = this.renderDots(maxSlides);
		return `
			<div class="slider__arrow slider__arrow--prev slider__nav-element"><svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3 0.999999L1.29999 16L16.3 31" stroke="#1F1F1F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
			<div class="slider__dots">${dotsHTML}</div>
			<div class="slider__arrow slider__arrow--next slider__nav-element"> <svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.70001 0.999999L16.7 16L1.70001 31" stroke="#1F1F1F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
		`;
	}

	private renderDots(maxSlides: number) {
		let dotsHTMLs: string = '';
		for (let i = 0; i < maxSlides; i++) {
			dotsHTMLs += `<div class="slider__dot slider__nav-element${i === 0 ? ' active': ''}" data-index="${i}"></div>`;
		}
		return dotsHTMLs;
	}

	public switchActiveElements(container: HTMLElement, maxSlides: number) {
		const navElements: NodeListOf<Element> = container.querySelectorAll('.slider__nav-element');

		navElements.forEach(navElement => navElement.addEventListener('click', handleNavigationClick));

		const initTouchSlidesOnMobile = (): void => {
			if (document.documentElement.clientWidth <= 1200) {
				this.touchSlide(maxSlides, container);
			}
		}

		initTouchSlidesOnMobile();
		window.addEventListener('resize', initTouchSlidesOnMobile);

		function handleNavigationClick(event: Event) {
			const target: HTMLElement = event.target as HTMLElement;

			const currentElement: HTMLElement = container.querySelector('.active') as HTMLElement;
			const currentIndex: string = currentElement.dataset.index as string;
			const currentIndexInt: number = parseInt(currentIndex);
			const targetIndexInt: number = parseInt(target.dataset.index as string);

			let nextSlideNumber: number = currentIndexInt;
			if (target.classList.contains('slider__arrow--prev')) {
				nextSlideNumber = currentIndexInt === 0 ? maxSlides-1 : currentIndexInt - 1;
			} else if (target.classList.contains('slider__arrow--next')) {
				nextSlideNumber = currentIndexInt === maxSlides-1 ? 0 : currentIndexInt + 1;
			} else {
				nextSlideNumber = targetIndexInt;
			}

			new Navigation().toggleActiveElement(nextSlideNumber, container);
		}
	}

	touchSlide(maxSlides: number, container: HTMLElement) {		
		let startX: number;
		let startY: number;
		let distX: number;
		let distY: number;

		container.addEventListener("touchstart", (event: TouchEvent) => {
			const touch: Touch = event.touches[0];
			startX = touch.clientX;
			startY = touch.clientY;
		}, false);

		container.addEventListener("touchmove", (event: TouchEvent) => {
			if (event.touches.length > 1) return;
			const touch: Touch = event.touches[0];
			distX = touch.clientX - startX;
			distY = touch.clientY - startY;
			event.preventDefault();
		}, false);


		container.addEventListener("touchend", handleTouchEnd);

		function handleTouchEnd() {
			const slideContainer: HTMLElement = document.querySelector(".slider__slide.active") as HTMLElement;
			const currentIndex: string = slideContainer.dataset.index as string;
			const currentIndexInt: number = parseInt(currentIndex);
			let nextSlideNumber: number = currentIndexInt;
			
			if (Math.abs(distX) > Math.abs(distY)) {
				if (distX > 0) {
					nextSlideNumber = currentIndexInt === 0 ? maxSlides - 1 : currentIndexInt - 1;
				} else if (distX < 0) {
					nextSlideNumber = currentIndexInt === maxSlides - 1 ? 0 : currentIndexInt + 1;
				}
			} else {
				console.log("Not a swipe");
			}
			
			new Navigation().toggleActiveElement(nextSlideNumber, container);
		}
	}

	public toggleActiveElement(nextSlideNumber: number, container: HTMLElement): void {
		container.querySelectorAll('.active').forEach(element => {
			element.classList.remove('active');
		});
		container.querySelectorAll(`[data-index="${nextSlideNumber}"]`).forEach(element => {
			element.classList.add('active');
		})
	}

	public autoPLaySlider(isActive: boolean, container: HTMLElement, maxSlides: number): void {
		const autoplaySpeed: number = 5000;
		const reset: number = 0;
		let startSlide: number = 1;
		let timer: number = setInterval(() => {
			return isActive ?
				new Navigation().toggleActiveElement(startSlide >= maxSlides ?
					(startSlide = reset, startSlide++) :
					startSlide++, container) : clearInterval(timer);
		}, autoplaySpeed, isActive);
	}
}