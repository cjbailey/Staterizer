function isArrayOfTransitions(array) {
	return Array.isArray(array) && array.every(x => x.isTransition);
}

function StatefulProxyHandler(transitions, hasReachedTransitions) {
	return {
		get(obj, prop) {
			if (prop === "__isProxy") return true;

			if (typeof obj[prop] === "object" && !hasReachedTransitions && transitions[prop] && !obj.__isProxy) {
				return new Proxy(obj[prop], StatefulProxyHandler(transitions[prop], hasReachedTransitions || isArrayOfTransitions(transitions)));
			} else {
				return obj[prop];
			}
		},

		set(obj, prop, val) {
			if (obj[prop] === val || typeof obj[prop] === "function") return true;

			let oldVal = obj[prop];
			obj[prop] = val;

			// Check for registered transition
			let activeTransitions = [];

			if (Array.isArray(obj)) {
				activeTransitions = transitions && transitions.filter(t => (!t.from || t.from === oldVal) && (!t.to || t.to === val));
			} else if (Array.isArray(transitions[prop])) {
				activeTransitions = transitions && transitions[prop].filter(t => (!t.from || t.from === oldVal) && (!t.to || t.to === val));
			}

			activeTransitions.forEach(t =>
				t.callback({
					previous: oldVal,
					next: val,
					parent: obj
				})
			);
			return true;
		}
	};
}

const Stateful = {
	from(src, transitions = {}) {
		return new Proxy(src, StatefulProxyHandler(transitions));
	}
};

export default Stateful;
