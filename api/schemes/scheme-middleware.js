const Schemes = require("./scheme-model");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
	const id = req.params.scheme_id;

	const scheme = await Schemes.findById(id);
	if (!scheme) {
		res.status(400).json({ message: `scheme with scheme_id ${id} not found` });
	} else {
		req.scheme = scheme;
		next();
	}
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
	const body = req.body;

	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "invalid scheme_name" });
	} else {
		req.body.scheme_name = body.scheme_name.trim();
		next();
	}
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
	const body = req.body;

	if (
		!body ||
		Object.keys(body).length === 0 ||
		typeof body.instructions !== "string" ||
		typeof body.step_number !== "number" ||
		body.step_number < 1
	) {
		res.status(400).json({ message: "invalid step" });
	}
};

module.exports = {
	checkSchemeId,
	validateScheme,
	validateStep,
};
