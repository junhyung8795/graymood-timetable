import Seo from "../../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
    const router = useRouter();

    const [managerAccessCode, setAccessCode] = useState("");
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    const handleManagerLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/manager/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ managerAccessCode }),
        });
        const data = await response.json();
        console.log(data);
        if (data.statusCode === "200") {
            localStorage.setItem("accessCode", data.managerAccessCode);
            router.push("/notice");
        } else {
            e.target.firstElementChild.value = "";
            e.target.firstElementChild.placeholder = data.message;
            router.push("/manager/login");
        }
    };
    return (
        <div className="p-3 mb-2 bg-black text-white">
            <Seo title="ManagerLogin" />
            <Link href="/">동아리원 로그인</Link>
            <div className="title">
                <h1>Graymood Timetable</h1>
            </div>
            <form
                method="GET"
                className="input-group mb-3"
                onSubmit={handleManagerLogin}
                id="login"
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="write the code"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="managerAccessCode"
                    onChange={({ target }) => setAccessCode(target.value)}
                />
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                        Login
                    </button>
                </div>
            </form>
            {/* <form
                method="GET"
                className="input-group mb-3"
                onSubmit={handleManagerLogin}
                id="login"
            >
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
            </form> */}
        </div>
    );
}
