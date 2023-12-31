import React, { useState } from 'react';
import styles from '@/styles/Settings.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account } from '../appwrite/appwriteConfig';

export default function profileSettings({ userInfo }) {
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
            <img className={styles.profilePic} src='https://cloud.appwrite.io/v1/storage/buckets/64dca8f96fee0c8bda65/files/64dca916111fd9385684/view?project=64d3bbb732556214a136&mode=admin'  width={100} height={100}></img>

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