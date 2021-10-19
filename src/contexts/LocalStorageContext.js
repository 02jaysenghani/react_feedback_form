const LocalStorageService = {

	getData(keyName, parse) {
		let data = localStorage.getItem(keyName) ?? []
		if (data && parse) {
			data = data.length ? JSON.parse(data) : [];
		}
		return data;
	},

	saveData(keyName, data, stringify) {
		if (stringify) {
			data = JSON.stringify(data)
		}
		localStorage.setItem(keyName, data)
	},

	deleteData(keyName) {
		localStorage.removeItem(keyName)
	}
};

export default LocalStorageService;