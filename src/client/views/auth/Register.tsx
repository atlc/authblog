import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Login = () => {
    const [chirpAuthor, setChirpAuthor] = useState('');
    const [chirpText, setChirpText] = useState('');


    (async () => {
        const { value: wholeChirp} = await Swal.fire({
            title: 'Editable Chirp',
            html:
                `<input id="user" class="swal2-input" />
                <textarea id="chirpArea" class="swal2-input"></textarea>
                `
            ,
            preConfirm: () => {
                return {
                    user: (document.getElementById('user') as HTMLInputElement).value,
                    chirpText: (document.getElementById('chirpArea') as HTMLTextAreaElement).value
                }
            }
        })

        if (wholeChirp) {
            console.log(wholeChirp.user.toString());
            let user = wholeChirp.user.toString();
            setChirpAuthor(user);
            let text = wholeChirp.chirpText.toString();
            setChirpText(text);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'There was an error with one of the fields',
                icon: 'error'
            })
        }
    })()


    return (
        <>
        </>
    );
}

export default Login;