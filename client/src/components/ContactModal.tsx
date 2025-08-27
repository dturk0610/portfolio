import React from 'react';
import './ContactModal.css'; // We'll define styles separately

type ContactModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [result, setResult] = React.useState("");
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // use 'auto' for instant
            });
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Sending...");
        const formData = new FormData(event.currentTarget);
        formData.append("access_key", "5befd409-1163-4260-a926-fb1f78ead451");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            setResult("Form Submitted Successfully");
            event.currentTarget.reset();
        } else {
            setResult(data.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal-backdrop"
            onClick={onClose}>
            <div
                className="modal-content bg-slate-50 dark:bg-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <form className="form" onSubmit={onSubmit}>
                    <p>Want to connect on future opportunities or have feedback on my page, feel free to contact me!</p>
                    <input className="input text-black" type="text" name="name" placeholder="Name" required />
                    <input className="input text-black" type="email" name="email" placeholder="Email" required />
                    <textarea className="input text-black" name="message" placeholder="Message" required />
                    <button
                        className="border border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white transition-colors flex items-center gap-2" 
                        type="submit">Submit Form</button>
                </form>
                <span>{result}</span>
            </div>
        </div>
    );
}