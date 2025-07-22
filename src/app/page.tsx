


"use client";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function LoginPage() {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [form, setForm] = useState({
    username: "",
    gender: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      if (!form.username || !form.gender) {
        setMessage("Please enter a username and select gender.");
        return;
      }
      // Check if username already exists
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", form.username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setMessage("Username already taken. Please choose another.");
        return;
      }
      // Add new user to Firestore
      await addDoc(usersRef, {
        username: form.username,
        gender: form.gender,
      });
      setMessage("Signup successful! You can now login.");
      setMode("login");
    } else {
      if (!form.username) {
        setMessage("Please enter your username.");
        return;
      }
      // Check if username exists
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", form.username));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setMessage("Username not found. Please sign up first.");
        return;
      }
      setMessage(`Welcome, ${form.username}!`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Bible Trivia Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder={mode === "signup" ? "Create a username/nickname" : "Enter your username"}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
          {mode === "signup" && (
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
          >
            {mode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => {
              setMode(mode === "signup" ? "login" : "signup");
              setMessage("");
            }}
          >
            {mode === "signup" ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
        </div>
        {message && <div className="mt-4 text-center text-red-500">{message}</div>}
      </div>
    </div>
  );
}
