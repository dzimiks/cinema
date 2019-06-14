const moment = require('moment');

let register = function (Handlebars) {
	let helpers = {
		// Put all of your helpers inside this object
		formatDate: (date) => {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},

		ifEquals: (arg1, arg2, options) => {
			return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
		}
	};

	if (Handlebars && typeof Handlebars.registerHelper === "function") {
		// Register helpers
		for (let prop in helpers) {
			Handlebars.registerHelper(prop, helpers[prop]);
		}
	} else {
		// Just return helpers object if we can't register helpers here
		return helpers;
	}

};

module.exports.register = register;
module.exports.helpers = register(null);
