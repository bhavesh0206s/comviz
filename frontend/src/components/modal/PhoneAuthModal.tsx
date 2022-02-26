import { useEffect, useRef, useState } from 'react';
import 'src/lib/firebase/firebaseConfig';
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from 'firebase/auth';
import { signIn } from 'next-auth/react';

import Modal from './Modal';
import Loading, { Loader } from '../Loading';

export default function PhoneAuthModal({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const auth = getAuth();
    const [authErr, setAuthErr] = useState<string | undefined>();
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const recaptchaWrapperRef = useRef();

    const sendOtp = (phoneNumber: string) => {
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setisLoading(false);
                setIsOtpSent(true);
                if (recaptchaWrapperRef.current)
                    recaptchaWrapperRef.current.innerHTML = `<div id="phone-sign-in-button"></div>`;
                window.recaptchaVerifier && window.recaptchaVerifier.clear();
            })
            .catch((error) => {
                //console.log(error)
                setAuthErr("Couldn't sent OTP, Please try again later.");
                setisLoading(false);
                recaptchaWrapperRef.current &&
                    (recaptchaWrapperRef.current.innerHTML = `<div id="phone-sign-in-button"></div>`);
                window.recaptchaVerifier && window.recaptchaVerifier.clear();
            });
    };

    const getRecaptcha = () => {
        const recaptchaVerifier = new RecaptchaVerifier(
            'phone-sign-in-button',
            {
                size: 'invisible',
                callback: (response) => {
                    console.log('Recaptcha verified');
                    return;
                },
            },
            auth,
        );
        window.recaptchaVerifier = recaptchaVerifier;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true);
        setAuthErr('');
        getRecaptcha();
        sendOtp(phone);
    };

    const submitOtp = () => {
        setisLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (result) => {
                // User signed in successfully.
                const user = result.user;
                console.log(user);
                try {
                    const res: {
                        error: string | undefined;
                        url: string | undefined;
                    } = await signIn('phone-login', {
                        redirect: false,
                        phone,
                        firebase_uid: user.uid,
                    });
                    if (res?.error) {
                    } else {
                        // if (redirectURL) router.push(redirectURL);
                    }
                } catch (e) {}
                setIsOpen(false);
                setisLoading(false);
                setIsOtpSent(false);
            })
            .catch((error) => {
                setisLoading(false);
            });
    };

    const onClose = () => {
        setIsOtpSent(false);
        setOtp('');
        setPhone('');
    };

    return (
        <Modal
            title="Login with phone number"
            isOpen={isOpen}
            onClose={onClose}
            setIsOpen={setIsOpen}
        >
            <div className="form-control w-full">
                {!isOtpSent ? (
                    <>
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Type here"
                            value={phone}
                            className="input input-bordered w-full"
                        />
                        <div ref={recaptchaWrapperRef}>
                            <div id="phone-sign-in-button"></div>
                        </div>
                        {!isLoading ? (
                            <button onClick={onSubmit} className="btn mt-4">
                                Send otp
                            </button>
                        ) : (
                            <Loading />
                        )}
                    </>
                ) : (
                    <>
                        <label className="label">
                            <span className="label-text">Otp</span>
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
                            maxLength={6}
                            placeholder="Type here"
                            className="input input-bordered w-full"
                        />
                        {!isLoading ? (
                            <button onClick={submitOtp} className="btn mt-4">
                                Verify
                            </button>
                        ) : (
                            <Loading />
                        )}
                    </>
                )}
            </div>
        </Modal>
    );
}
