import React, { useState } from 'react';
import styles from '@/styles/Login.module.css';
import Image from 'next/image';

export default function Login() { // Changed the component name to start with a capital letter
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email submitted:', email);
    };

    return (
        <main className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <Image src={"/Login/logo.png"} alt={"logo"} width={80} height={80} />
                <h1>Welcome To Dee-Tech</h1>
                <p>Login/Register With Your Email</p>
                <form className={styles.formInput} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email} // Bind the input value to the state variable
                        onChange={handleEmailChange} // Handle input changes
                    />
                    <button type="submit">Continue</button>
                </form>
            </div>
        </main>
    );
}
