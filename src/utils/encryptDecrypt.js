const argon2 = require("argon2");

// Function to hash a password
const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (err) {
        console.error("Error hashing password:", err);
    }
}

module.exports = {hashPassword};

