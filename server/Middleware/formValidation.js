function formValidation(req, res, next) {
    try {
        console.log(req.body)
        let { username, email, password } = req.body;
        let validationErrors = [];

        if (!username.trim()) {
            validationErrors.push({ message: 'Username is required' });
        }

        let userNameRegex = /^[a-zA-Z0-9 ]*$/;
        if (!userNameRegex.test(username)) {
            validationErrors.push({ message: 'Username can only contain alphanumeric characters and spaces' });
        }

        if (email) {
            if (email && email.trim()) {
                let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email)) {
                    validationErrors.push({ message: 'Invalid email format' });
                }
            }
        }

        if (!password.trim()) {
            validationErrors.push({ message: 'Password is required' });
        } else if (password.length < 5) {
            validationErrors.push({ message: 'Password should have at least 5 characters' });
        }

        if (validationErrors.length > 0) {
            // Store validation errors in res.locals to be accessed in the main route handler
            res.locals.validationErrors = validationErrors;
        }

        next();
    } catch (e) {
        console.log("Error", e);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = formValidation;
