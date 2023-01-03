import Seo from "../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    const router = useRouter();

    const [accessCode, setAccessCode] = useState("");

    const handleSubmit = (e) => {
        if (accessCode === "GM29") {
            e.preventDefault();
            localStorage.setItem("accessCode", accessCode);
            console.log(typeof accessCode);
            router.push("/about");
        }
    };
    return (
        <div className="p-3 mb-2 bg-black text-white">
            <Seo title="Home" />
            <div className="title">
                <h1>Graymood Timetable</h1>
            </div>
            <form className="input-group mb-3" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="write the code"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="accessCode"
                    onChange={({ target }) => setAccessCode(target.value)}
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
