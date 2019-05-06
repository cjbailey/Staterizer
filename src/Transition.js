const newTransition = args => {
	let props = {
		isTransition: {
			writable: false,
			value: true,
			enumerable: true
		},
		callback: {
			writable: false,
			value: args.callback,
			enumerable: true
		}
	};

	if (args.vFrom !== undefined) {
		props.from = {
			writable: false,
			value: args.vFrom,
			enumerable: true
		};
	}

	if (args.vTo !== undefined) {
		props.to = {
			writable: false,
			value: args.vTo,
			enumerable: true
		};
	}

	return Object.create(Object.prototype, props);
};

const Transition = {
	from(vFrom) {
		return {
			to(vTo) {
				return {
					then(callback) {
						return newTransition({ vFrom, vTo, callback });
					}
				};
			},
			then(callback) {
				return newTransition({ vFrom, callback });
			}
		};
	},
	to(vTo) {
		return {
			then(callback) {
				return newTransition({ vTo, callback });
			}
		};
	},
	then(callback) {
		return newTransition({ callback });
	}
};

export default Transition;
