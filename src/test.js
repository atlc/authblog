const shitpostify = require('shitpostify');
const validate = require('@atlc/hibp');

(async () => {
    let test = await shitpostify('test123 lol what is cracking yall ');
    console.log(test);
    let pw = await validate('test123');
    console.log(pw)
})()