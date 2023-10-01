export default class API {
	private _key;
	private _printType;
	private _langRestrict;
	constructor() {
		this._key = 'AIzaSyAyk6m0MYVKU9F-6ne8KvwXswnGMEXeZxU';
		this._printType = 'books';
		this._langRestrict = 'en';
	}

	public get getKey() : string {
		return this._key;
	}

	public get getPrintType() : string {
		return this._printType;
	}

	public get getlangRestrict() : string {
		return this._langRestrict;
	}

	public getURL(subject: string, startIndex: number, maxResults: number): string {
		const url: string = `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&key=${this.getKey}&printType=${this.getPrintType}&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=${this.getlangRestrict}`;
		return url;
	}
	
	private async fetchData(url: string): Promise<Array<any>> {
		try {
		  const response = await fetch(url);
		//   console.log(response);
		  if (!response.ok) {
			document.querySelector('.booksload')?.classList.add('hidden');
			throw new Error(`Error! Status: ${response.status}`);
		  } else {
			const data = await response.json();
			return data;
		  }
		} catch (error) {
		  console.error('Error fetch data:', error);
		  throw error;
		}
	  }
	
	public async getDataBooks(url: string): Promise<any> {
		try {
			const data: unknown = await this.fetchData(url);
			return data;
		} catch (error) {
			console.error('Error get data books:', error);
		}
	}
}