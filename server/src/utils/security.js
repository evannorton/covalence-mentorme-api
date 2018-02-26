import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

function generateHash(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

function checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

export { generateHash, checkPassword };