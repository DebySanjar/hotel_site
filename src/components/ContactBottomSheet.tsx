import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';

interface ContactBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const StyledWrapper = styled.div`
  .container {
    max-width: 450px;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 20px auto;
    position: relative;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgb(16, 137, 211);
    margin-bottom: 20px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
    font-size: 14px;
  }

  .form .input::placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #12b1d1;
  }

  .form textarea.input {
    resize: vertical;
    min-height: 100px;
    font-family: inherit;
  }

  .form .submit-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
    color: white;
    padding: 15px;
    margin: 20px auto 10px;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    font-size: 16px;
  }

  .form .submit-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }

  .form .submit-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
  }

  .social-account-container {
    margin-top: 25px;
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
  }

  .social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 10px;
  }

  .social-account-container .social-accounts .social-button {
    background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
    border: 5px solid white;
    padding: 5px;
    border-radius: 50%;
    width: 40px;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 12px 10px -8px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .social-account-container .social-accounts .social-button .svg {
    fill: white;
    margin: auto;
    width: 20px;
    height: 20px;
  }

  .social-account-container .social-accounts .social-button:hover {
    transform: scale(1.2);
  }

  .social-account-container .social-accounts .social-button:active {
    transform: scale(0.9);
  }

  .error-text {
    color: #ff4444;
    font-size: 11px;
    margin-top: 5px;
    margin-left: 10px;
  }
`;

export default function ContactBottomSheet({ isOpen, onClose }: ContactBottomSheetProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Ism kiritish majburiy';
        } else if (value.length < 2) {
          error = "Ism kamida 2 ta belgidan iborat bo'lishi kerak";
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email kiritish majburiy';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Email formati noto'g'ri";
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Telefon raqam kiritish majburiy';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Xabar kiritish majburiy';
        } else if (value.length < 10) {
          error = "Xabar kamida 10 ta belgidan iborat bo'lishi kerak";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      validateField(name, value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = Object.keys(formData).every((key) =>
      validateField(key, formData[key as keyof typeof formData])
    );

    if (isValid) {
      console.log('Form submitted:', formData);
      alert("Xabaringiz yuborildi! Tez orada aloqaga chiqamiz.");
      onClose();
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed bottom-0 left-0 right-0 z-[101] max-h-[90vh] overflow-y-auto"
          >
            <StyledWrapper>
              <div className="container">
                <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <X className="w-6 h-6 text-gray-600" />
                </button>

                <div className="heading">Bog'lanish</div>

                <form className="form" onSubmit={handleSubmit}>
                  <input placeholder="Ismingiz" name="name" type="text" className="input" value={formData.name} onChange={handleChange} onBlur={(e) => validateField('name', e.target.value)} />
                  {errors.name && <div className="error-text">{errors.name}</div>}

                  <input placeholder="Email" name="email" type="email" className="input" value={formData.email} onChange={handleChange} onBlur={(e) => validateField('email', e.target.value)} />
                  {errors.email && <div className="error-text">{errors.email}</div>}

                  <input placeholder="Telefon (+998 XX XXX XX XX)" name="phone" type="tel" className="input" value={formData.phone} onChange={handleChange} onBlur={(e) => validateField('phone', e.target.value)} />
                  {errors.phone && <div className="error-text">{errors.phone}</div>}

                  <textarea placeholder="Xabaringiz" name="message" className="input" value={formData.message} onChange={handleChange} onBlur={(e) => validateField('message', e.target.value)} />
                  {errors.message && <div className="error-text">{errors.message}</div>}

                  <button type="submit" className="submit-button">Yuborish</button>
                </form>

                <div className="social-account-container">
                  <span className="title">Ijtimoiy tarmoqlar</span>
                  <div className="social-accounts">
                    <button className="social-button" type="button" onClick={() => window.open('https://instagram.com', '_blank')}>
                      <svg viewBox="0 0 448 512" className="svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                    </button>
                    <button className="social-button" type="button" onClick={() => window.open('https://facebook.com', '_blank')}>
                      <svg viewBox="0 0 512 512" className="svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" /></svg>
                    </button>
                    <button className="social-button" type="button" onClick={() => window.open('https://t.me/ferghanahotel', '_blank')}>
                      <svg viewBox="0 0 496 512" className="svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </StyledWrapper>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
