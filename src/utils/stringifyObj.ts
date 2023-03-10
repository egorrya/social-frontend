interface Obj {
	[key: string]: any;
}

const stringifyObj = (obj: Obj) => {
	const str = [];
	for (const p in obj)
		if (obj.hasOwnProperty(p) && obj[p]) {
			str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
		}
	return str.join('&');
};

export default stringifyObj;
