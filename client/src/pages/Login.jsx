import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="flex w-[70%] h-full mx-auto my-16">
            <div className="w-full hidden xl:flex xl:items-center md:justify-center">
                <img
                    className="h-full rounded-lg"
                    src="https://images.unsplash.com/photo-1572202808998-93788f6d39da?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="nature image"
                />
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                <form
                    action="/login"
                    method="post"
                    className="md:w-96 w-80 flex flex-col items-center justify-center"
                >
                    <h2 className="text-4xl text-gray-900 font-medium">
                        Sign in
                    </h2>
                    <p className="text-sm text-gray-500/90 my-5">
                        Welcome back! Please sign in to continue
                    </p>

                    <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-2xl pl-3 gap-2">
                        <Mail className="w-6 h-6" />
                        <input
                            type="email"
                            placeholder="Email ID"
                            className=" text-gray-500/80 bg-white placeholder-gray-500/80 outline-none text-sm w-full h-full px-5 rounded-2xl"
                            required
                        />
                    </div>

                    <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-2xl pl-3 gap-2">
                        <Lock className="w-6 h-6" />
                        <input
                            type="password"
                            placeholder="Password"
                            className=" text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full px-5 rounded-2xl"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full h-11 rounded-md text-white bg-[#432507] hover:opacity-90 transition-opacity"
                    >
                        Login
                    </button>
                    <p className="text-gray-500/90 text-sm mt-4">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-[#432507] hover:underline"
                        >
                            Sign up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
