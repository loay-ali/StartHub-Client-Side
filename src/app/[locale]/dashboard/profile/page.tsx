'use client';

import config from "@/constants/config";
import { useEffect, useState } from "react";

import { AiOutlineLoading } from "react-icons/ai";
import { notificationService } from "@/lib/notifiationSystem";

export default function ProfilePage({user}:{user: {image:string,name:string,role:string}}) {
    user = {
        image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        name: "Loay Ali",
        role: "Manager"
    };
    
    const [isFetching,setIsFetching] = useState(true);

    const [isUpdating,setIsUpdating] = useState(false);
    const [isChanging,setIsChanging] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "John Doe",
        email: "john@example.com",
        password: "",
    });

  const handleChange = (e:any) => {
    
    setIsChanging(true);
    const { name, value } = e.target;
        setFormData((prev:any) => ({
        ...prev,
        [name]: value,
        }));
    };

    useEffect(() => {
        if( isFetching ) {
            fetch(config.apiUrl +'/auth/profile',{credentials: 'include'})
                .then(res => {
                    if( res.status == 200 ) {
                        return res.json();
                    }else {
                        return Promise.reject();
                    }
                }).then(res => {
                    setFormData((prev:any) => ({
                        ...prev,
                        fullName: res.fullname ?? "",
                        email: res.email
                    }));
                });
        }

        if( isUpdating == true && isChanging == true ) {
            notificationService.info("Profile Update", "Changes detected. Click Save to update your profile.");
        }
    },[isUpdating])

    return (
    <div className="bg-white max-w-[500px] mx-auto mt-20 rounded p-5">
      <div className="profile-card">
        <div className = 'flex items-center gap-5'>
          <img src={user.image} alt="User" className="w-[100px] h-[100px] border-2 rounded-full" />

          <div className="profile-info">
            <h2>{user.name}</h2>
            <p><strong>{user.role}</strong></p>
          </div>
        </div>

        <section>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>

          <button
            onClick = {() => setIsUpdating(true)}
            disabled = {!isChanging || isUpdating}
            type="submit"
            className="flex justify-center button w-full disabled:opacity-[0.5] disabled:hover:opacity-[0.5]! disabled:cursor-not-allowed!">
            {isUpdating ? <AiOutlineLoading className = 'spinner-loading' />:<>Save Changes</>}
          </button>
        </section>
      </div>
    </div>
    );
}