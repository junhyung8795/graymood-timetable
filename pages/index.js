import Seo from "../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import dbConnect from "../db/dbConnect";
import { signIn } from "next-auth/react";

export default function Home(req, res) {
    const router = useRouter();
    const [userCode, setUserCode] = useState("");
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        const alreadyAccessed = localStorage.getItem("accessCode");
        if (alreadyAccessed) {
            router.push("/notice");
        }
    }, []);
    const handleUserLogin = async (e) => {
        e.preventDefault();
        const response = await signIn("credentials", {
            redirect: false,
            password: userCode,
        });
        if (response.error) {
            e.target.firstElementChild.value = "";
            e.target.firstElementChild.placeholder = "Wrong Code";
        } else {
            router.push("/notice");
        }
    };
    return (
        <div className="p-3 mb-2 bg-black text-white">
            <Seo title="Home" />
            <div className="title">
                <h1>Graymood Timetable</h1>
            </div>
            <form
                method="GET"
                className="input-group mb-3"
                onSubmit={handleUserLogin}
                id="login"
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="write the code"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={({ target }) => setUserCode(target.value)}
                />
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export async function getServerSideProps() {
    await dbConnect();
    return { props: {} };
}
