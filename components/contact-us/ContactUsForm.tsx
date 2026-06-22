"use client";

import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiMessageSquare,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineLoading } from "react-icons/ai";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import config from "@/constants/config";

export default function ContactUsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading,setIsLoading] = useState(true);
  const [isDone,setIsDone] = useState(document.cookie.indexOf('SHContactUs') != -1 ? true:false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {

    if( isLoading ) {
      fetch(config.apiUrl +'/contact-us/leave-message',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullname: name,
          email,
          message
        })
      }).then(res => {
        if( res.status == 201 ) {
          setIsDone(true);
          const expireDate = new Date();
          
          expireDate.setTime(expireDate.getTime() + (24*60*60*1000));
          document.cookie ='SHContactUs=1;expires='+ expireDate.toUTCString();
        }
      }).finally(() => {
        setIsLoading(false);
      });
    }

  },[isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    setIsLoading(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-10 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
        {isDone ? (
          <section className = 'flex flex-col justify-center items-center gap-10'>
            <FaEnvelopeCircleCheck size = {50} color = "#28a745" />
            <strong className = 'text-center'>We've Received Your Message, Thank You For Your Feedback</strong>
          </section>):(<><div className="text-center">
          <div className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            💬 Get In Touch
          </div>

          <h1 className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-5xl font-bold text-transparent">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            We'd love to hear from you. Send us a message and our team will get
            back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={`w-full rounded-xl py-3 pl-12 pr-4 outline-none transition ${
                  errors.name
                    ? "border border-red-500"
                    : "border border-border focus:border-primary"
                }`}
              />
            </div>

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full rounded-xl py-3 pl-12 pr-4 outline-none transition ${
                  errors.email
                    ? "border border-red-500"
                    : "border border-border focus:border-primary"
                }`}
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Message</label>

            <div className="relative">
              <FiMessageSquare className="absolute left-4 top-5 text-text-secondary" />

              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className={`w-full rounded-xl py-3 pl-12 pr-4 outline-none transition ${
                  errors.message
                    ? "border border-red-500"
                    : "border border-border focus:border-primary"
                }`}
              />
            </div>

            {errors.message && (
              <p className="mt-2 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <button
            style = {{opacity: isLoading ? 0.5:1}}
            disabled = {isLoading}
            type="submit"
            className="flex justify-center cursor-pointer w-full rounded-xl bg-gradient-to-r from-primary to-primary-dark py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
          >
            {isLoading ? <AiOutlineLoading className = 'spinner-loading'/>:<>Send Message</>}
          </button>
        </form>

        <div className="mt-10 border-t border-border pt-8">
          <h3 className="text-center text-lg font-semibold text-text-primary">
            Follow Us
          </h3>

          <div className="mt-5 flex justify-center gap-4">
            <a
              href="#"
              className="rounded-full bg-primary/10 p-3 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-white"
            >
              <FiFacebook size={22} />
            </a>

            <a
              href="#"
              className="rounded-full bg-primary/10 p-3 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-white"
            >
              <FiInstagram size={22} />
            </a>

            <a
              href="#"
              className="rounded-full bg-primary/10 p-3 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-white"
            >
              <FiLinkedin size={22} />
            </a>

            <a
              href="#"
              className="rounded-full bg-primary/10 p-3 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-white"
            >
              <FaXTwitter size={20} />
            </a>
          </div>
        </div></>)}
      </div>
    </div>
  );
}
