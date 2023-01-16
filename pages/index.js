import Seo from "../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../db/dbConnect";

export default function Home() {
    const router = useRouter();

    const [userAccessCode, setAccessCode] = useState("");
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        const alreadyAccessed = localStorage.getItem("accessCode");
        if (alreadyAccessed) {
            router.push("/notice");
        }
    }, []);

    const handleUserLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userAccessCode }),
        });
        const data = await response.json();
        if (data.statusCode === "200") {
            localStorage.setItem("accessCode", data.userAccessCode);
            router.push("/notice");
        } else {
            e.target.firstElementChild.value = "";
            e.target.firstElementChild.placeholder = data.message;
            router.push("/");
        }
    };
    return (
        <div className="p-3 mb-2 bg-black text-white">
            <Seo title="Home" />
            <Link href="/manager/login"> 관리자 로그인</Link>
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
                    name="userAccessCode"
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

export async function getServerSideProps() {
    await dbConnect();
    return { props: {} };
}
