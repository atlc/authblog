import { match } from 'assert';
import * as crypto from 'crypto';
import * as rp from 'request-promise';

export const validate = async (password) => {
    // Breached plaintext passwords are hashed as SHA-1 per the maintainer of HIBP
    const shasum = crypto.createHash('sha1');
    shasum.update(password);
    const hashedPass = shasum.digest('hex');

    // Pass the API the first 5 characters of the resulting hash, and it returns a list of 
    // ALL hashes that begin with those 5 characters, with those 5 characters popped off
    const matchesList = await rp(`https://api.pwnedpasswords.com/range/${hashedPass.slice(0, 5)}`);
    const matchesArray = matchesList.split('\r\n');
    const hashPrefixMatchString = hashedPass.slice(5, hashedPass.length).toUpperCase();
    const matchIndex = matchesArray.findIndex(hsh => hsh.includes(hashPrefixMatchString));

    if (matchIndex !== -1) {
        const matchInstances = Number(matchesArray[matchIndex].split(':')[1]).toLocaleString();
        return matchInstances;
    } else {
        return false;
    }
}