// React & Next
import React, { useState, useEffect } from 'react';
import styles from '@/styles/Login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Appwrite
import { v4 as uuidv4 } from 'uuid';
import { account } from '../appwrite/appwriteConfig';

export default function Login() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    useEffect(() => {
        const userData = account.get()
        userData.then(
            function(res) {
                console.log(res)
                router.push('/dashboard');
            },
            function(error) {
                const urlParams = new URLSearchParams(window.location.search);
                const userId = urlParams.get('userId');
                const secret = urlParams.get('secret');
        
                if (userId !== null && secret !== null) {
                    let promise = account.updateMagicURLSession(userId, secret);
                
                    promise.then(function (response) {
                        console.log(response); // Success
                        toast.success(`🤘 Operation Sucessfull}`, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        router.push('/dashboard');
                    }, function (error) {
                        console.log(error);
                        toast.error(`😡 Invalid Magic URL`, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    });
                }
            }
        )
    }, [])

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const createMagicUrl = async (email) => {
        try {
            const { protocol, host } = window.location;
            const response = await account.createMagicURLSession(uuidv4(), email, `${protocol}//${host}/`)
            console.log("Magic URL creation response:", response);
            return response;
        } catch (error) {
            console.error("Magic URL creation error:", error);
            throw error;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (email.trim() !== '') {
            try {
                await toast.promise(
                    () => createMagicUrl(email),
                    {
                        pending: 'Sending Email',
                        success: 'Email Sent 👌',
                        error: 'Operation Failed 🤯',
                    }
                );
            } catch (error) {
                toast.error(`❌ Operation Failed: ${error.message}`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } else {
            toast.warning('⚠️ Please enter an email', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
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
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <button type="submit">Continue</button>
                </form>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </main>
    );
}