import { User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                }
            );

            if (res.status === 200 || res.status === 201) {
                navigate("/login");
            } else if (res.status === 409) {
                setErrorMsg("User already exists. Please login instead.");
            } else {
                const { message } = await res
                    .json()
                    .catch(() => ({ message: "Server error" }));
                setErrorMsg(
                    message || "Something went wrong. Please try again."
                );
            }
        } catch (error) {
            setErrorMsg("Network error. Please try again later.");
            console.error("Signup error", error);
        }
    };
    return (
        <div className="flex w-[70%] h-full mx-auto my-16">
            <div className="w-full hidden xl:flex md:items-center md:justify-center">
                <img
                    className="h-full rounded-lg"
                    src="https://images.unsplash.com/photo-1615290144628-8fa0f0d61658?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="nature image"
                />
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                <form
                    onSubmit={handleSignup}
                    className="md:w-96 w-80 flex flex-col items-center justify-center"
                >
                    <h2 className="text-4xl text-gray-900 font-medium">
                        Sign up
                    </h2>
                    <p className="text-sm text-gray-500/90 mt-3 mb-5">
                        Create an account to continue
                    </p>
                    <div className="flex items-center w-full border border-gray-300/60 h-12 pl-3 gap-2 rounded-2xl">
                        <User className="w-6 h-6" />
                        <input
                            type="name"
                            placeholder="Name"
                            className=" placeholder-gray-500/80 outline-none text-sm w-full h-full px-5"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-2xl pl-3 gap-2">
                        <Mail className="w-6 h-6" />
                        <input
                            type="email"
                            placeholder="Email ID"
                            className=" text-gray-500/80 bg-white placeholder-gray-500/80 outline-none text-sm w-full h-full px-5 rounded-r-2xl"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="">
                        {errorMsg && (
                            <div className="text-xs text-red-500">
                                {errorMsg}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-2xl pl-3 gap-2">
                        <Lock className="w-6 h-6" />
                        <input
                            type="password"
                            placeholder="Password"
                            className=" text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full px-5 rounded-r-2xl"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full h-11 rounded-md text-white bg-[#432507] hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Sign up
                    </button>
                    <p className="text-gray-500/90 text-sm mt-4">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-[#432507] hover:underline cursor-pointer"
                        >
                            Sign in
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
