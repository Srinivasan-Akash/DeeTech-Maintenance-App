import React, { useState } from 'react';
import styles from '@/styles/Settings.module.css';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account } from '../appwrite/appwriteConfig';

export default function employeeSettings({ userInfo }) {
    const [newName, setNewName] = useState('');
    // const [newProfilePic, setNewProfilePic] = useState(null);

    const handleEditProfile = (e) => {
        e.preventDefault();
        // || newProfilePic === null
        if (newName.trim() === '') {
            toast.error('Please fill in all fields.', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            return;
        }

        const namePromise = account.updateName(newName);
        namePromise.then(function (response) {
            console.log(response); // Success
            toast.success('Name updated successfully!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }, function (error) {
            console.log(error); // Failure
            toast.error('Name update failed!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        });
    };

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.userInfo}>
                <Image className={styles.profilePic} width={100} height={120} src={'/dashboard/profile.png'} alt='A profile pic' />
                <h3>{userInfo.name}</h3>
                <p>{userInfo.email}</p>
            </div>

            <div className={styles.form}>
                <form onSubmit={handleEditProfile}>
                    <input
                        type='text'
                        placeholder='Enter New Name'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    {/* <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => setNewProfilePic(e.target.files[0])}
                    /> */}
                    <button type='submit'>Edit Profile</button>
                </form>
            </div>

            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                progress={undefined}
                theme='dark'
            />
        </div>
    );
}