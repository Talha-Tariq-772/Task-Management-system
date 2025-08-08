"use client";
import React from 'react';
import useDetectOutside from '../../../../hooks/useDetectOutside';
import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext';
import Image from "next/image";

const ProfileModal = () => {
  const { closeModal } = useTasks();
  const { user, handlerUserInput, updateUser, userState, changePassword } = useUserContext();
  const ref = React.useRef(null);
  useDetectOutside({ ref, callback: () => closeModal() });

  const { name, email, photo } = user || {};
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const handlePassword = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "old") setOldPassword(e.target.value);
    else setNewPassword(e.target.value);
  };

  const fallbackImage = "https://i.pinimg.com/1200x/16/2c/bf/162cbf41dfd8b43a337682d8056a706b.jpg";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 ">
      <div
        ref={ref}
        className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative z-50 transition-transform transform scale-100 hover:scale-100"
      >
        {/* Close on overlay click */}
        <div className="absolute inset-0" onClick={closeModal}></div>

        <div className="relative bg-white p-6 rounded-xl shadow-lg z-10">
          {/* Header */}
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-teal-400 shadow-md">
              <Image
                src={photo || fallbackImage}
                alt="Profile"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Name & Email Display */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{email}</p>
          </div>

          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();

              // Update name/email
              updateUser(e, {
                name: userState.name || "",
                email: userState.email || "",
              });

              // If password fields are filled, update password
              if (oldPassword && newPassword) {
                changePassword(oldPassword, newPassword);
              }
            }}
          >
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={name}
                onChange={(e) => handlerUserInput("name")(e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {/* Email with Icon */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={email}
                  onChange={(e) => handlerUserInput("email")(e)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="oldPassword" className="text-sm font-medium mb-1">
                  Old Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={handlePassword("old")}
                    placeholder="Old password"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="newPassword" className="text-sm font-medium mb-1">
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={handlePassword("new")}
                    placeholder="New password"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
