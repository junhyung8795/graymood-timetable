import Seo from "../components/Seo";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dbConnect from "../db/dbConnect";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
    const router = useRouter();
    const [userCode, setUserCode] = useState("");
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            router.push("/notice");
        }
    });

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
        <div className="body">
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
                    }
                    .title {
                        color: white;
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
    await dbConnect();
    // const session = await getSession(context);
    // if (session) {
    //     return {
    //         redirect: {
    //             destination: "/notice",
    //             permanent: false,
    //         },
    //     };
    // }
    return { props: {} };
}
