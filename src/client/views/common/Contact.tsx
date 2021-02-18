import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { api } from '../../utils/api-service'

const Contact = () => {
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [subject, setSubject] = useState(null);
    const [content, setContent] = useState(null);


    const contact = async (e: React.MouseEvent) => {
        e.preventDefault;
        if (from && to && subject && content) {
            const res = await api('/api/mail/contact', 'POST', { from, to, subject, content });
            if (res.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Contact info has been sent',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: await res.json(),
                    icon: 'error'
                })
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill out all fields',
                icon: 'error'
            })
        }
    }

    return (
        <form>
            <div className="form-group"><h1>Enter your info if you want to "contact" "us"</h1></div>
            <div className="form-group">
                <label>Email address</label>
                <input onChange={(e) => setFrom(e.target.value)} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter your email address" />
                <small className="form-text text-muted">We'll "never" share your "email" with "anyone" "else".</small>
            </div>
            <div className="form-group">
                <label>Enter the email address of someone who you would never want any information sent to about yourself</label>
                <input onChange={(e) => setTo(e.target.value)} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter their email address here" />
                <small className="form-text text-muted">We'll "never" share your "email" with "anyone" "else".</small>
            </div>
            <div className="form-group">
                <label>Enter a 1-6 word secret about yourself</label>
                <input onChange={(e) => setSubject(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter a short secret about yourself" />
            </div>
            <div className="form-group">
                <label>Enter some additional "subscription" info about yourself</label>
                <textarea onChange={(e) => setContent(e.target.value)} className="form-control" rows={3}></textarea>
            </div>
            <button onClick={contact} className="m-2 btn btn-primary">Submit</button>
        </form>
    );
}

export default Contact;