import Seo from "../components/Seo";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
    const router = useRouter();
    const [userCode, setUserCode] = useState("");
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session) {
            router.push("/notice");
        }
        return;
    }, [router, session]);

    const handleUserLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await signIn("credentials", {
            redirect: false,
            password: userCode,
        });
        if (response.error) {
            e.target.firstElementChild.value = "";
            e.target.firstElementChild.placeholder = "Wrong Code";
            router.push("/");
        } else {
            router.push("/notice");
        }
        setLoading(false);
        return;
    };

    return (
        <div className="body">
            {loading ? (
                <div className="loading">
                    <h2>...loading</h2>
                </div>
            ) : (
                <div></div>
            )}
            <Seo title="Home" />
            <div className="title">
                <h1>Graymood Timetable</h1>
            </div>
            <form
                method="GET"
                className="input-group mb-3 loginForm"
                onSubmit={handleUserLogin}
                id="login"
            >
                <input
                    required
                    type="text"
                    placeholder="write the code"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="form-control loginFormInput"
                    onChange={({ target }) => setUserCode(target.value)}
                    style={{ borderRadius: "8px" }}
                />
                <div
                    className="col-12"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                    }}
                >
                    <button className="btn btn-primary" type="submit">
                        Login
                    </button>
                </div>
            </form>
            <style jsx>
                {`
                    .body {
                        width: 100vw;
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background-color: #111827;
                        overflow: scroll;
                        color: white;
                        position: relative;
                    }
                    .loading {
                        position: absolute;
                        top: 0px;
                        right: 0px;
                    }
                    .loginForm {
                        display: flex;
                        width: 50%;
                        justify-content: center;
                    }
                    .loginFormInput {
                        text-align: center;
                    }
                `}
            </style>
        </div>
    );
}

export async function getServerSideProps() {
    return { props: {} };
}
