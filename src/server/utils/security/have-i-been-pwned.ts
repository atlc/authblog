import * as crypto from 'crypto';
import * as rp from 'request-promise';

const validate = async (password) => {

    // Exposed plaintext passwords are hashed as SHA-1 per the maintainer of HIBP
    const shasum = crypto.createHash('sha1');
    shasum.update(password);
    const hashedPass = shasum.digest('hex');

    // Pass the API the first 5 characters of the resulting hash, and it returns a list of 
    // ALL hashes that begin with those 5 characters, with those characters truncated
    const matchesList = await rp(`https://api.pwnedpasswords.com/range/${hashedPass.slice(0, 5)}`);
    const matchesArray = matchesList.split('\r\n');
    const hashPrefixMatchString = hashedPass.slice(5, hashedPass.length).toUpperCase();
    const matchIndex = matchesArray.findIndex(hsh => hsh.includes(hashPrefixMatchString));

    if (matchIndex !== -1) {
        const matchInstances = Number(matchesArray[matchIndex].split(':')[1]).toLocaleString();
        console.log(`Bad password! ${password} has been found in ${matchInstances} separate account breaches!`)
    } else {
        console.log(`Good password! ${password} has NOT been found in any breaches :)`)
    }
}

validate('password123');
validate('qwerty');
validate('123456');
validate('123456789');
validate('$y7IMxkoE$kibQ@4FUK!AD3Znp87g5@PjkSSGoPF6J3NfG0KVFra$QWF804axfWIUBtps@g6$3&xYa');
validate('0zfzJ6fOB1%dG1tNbBgn!^fb0r7&VgFTTb%fIwH$giSZYZuxiRWbE1il^$Eqwwoj7xA#S');

