import Seo from "../../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function ChangeMemberAccessCode() {
    const router = useRouter();
    const [userCode, setUserCode] = useState("");
    useEffect(() => {}, []);

    const handleChangeCode = async (e) => {
        e.preventDefault();
        const changeForm = document.getElementById("change-form");

        await fetch("/api/member/changeAccessCode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userCode }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === "200") {
                    console.log(data.message);
                    router.push("/");
                } else if (data.statusCode === "500") {
                    console.log(data.message);
                    changeForm.value = "";
                    changeForm.placeholder = data.message;
                    router.push("/member/changeAccessCode");
                }
            });
    };
    return (
        <div
            className="p-3 mb-2 bg-black text-white"
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Seo title="Change Member Code" />
            <div className="title">
                <h1>Graymood Timetable</h1>
            </div>
            <h1>동아리원 접속코드 변경페이지</h1>
            <form
                className="input-group mb-3"
                onSubmit={handleChangeCode}
                id="login"
            >
                <input
                    id="change-form"
                    type="text"
                    className="form-control"
                    placeholder="write the code"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={({ target }) => setUserCode(target.value)}
                />
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                        동아리원 접속코드 변경
                    </button>
                </div>
            </form>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session?.user?.name !== "manager") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return { props: { session } };
}