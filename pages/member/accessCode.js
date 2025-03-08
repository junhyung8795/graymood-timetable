import Seo from "../../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MemberAccessCode from "../../db/schema/memberAccessCode";

export default function ChangeMemberAccessCode({ targetMemeberAccessCode }) {
    const router = useRouter();
    const [userCode, setUserCode] = useState(
        JSON.parse(targetMemeberAccessCode).memberAccessCode
    );
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.user?.name !== "manager") {
            router.push("/");
        }
        return;
    }, [router, session?.user?.name]);

    const handleChangeCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        const changeForm = document.getElementById("change-form");

        await fetch("/api/member/changeAccessCode", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userCode }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === "200") {
                    router.push("/notice");
                } else if (data.statusCode === "500") {
                    changeForm.value = "";
                    changeForm.placeholder = data.message;
                    router.push("/member/accessCode");
                } else {
                    router.push("/notice");
                }
            });
        setLoading(false);
        return;
    };
    return (
        <div
            className="p-3 mb-2 text-white"
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "scroll",
                backgroundColor: "#FEFEFE",
                position: "relative",
            }}
        >
            {loading ? (
                <div style={{ position: "absolute", top: "0px", right: "0px" }}>
                    <h2>...loading</h2>
                </div>
            ) : (
                <div></div>
            )}
            <Seo title="Change Member Code" />
            <div className="title" style={{ color: "black" }}>
                <h1>Graymood Timetable</h1>
                <h1>동아리원 접속코드 변경페이지</h1>
            </div>

            <form
                className="input-group mb-3"
                onSubmit={handleChangeCode}
                id="login"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        marginBottom: "10px",
                    }}
                >
                    <input
                        id="change-form"
                        type="text"
                        className="form-control"
                        placeholder="write the code"
                        defaultValue={
                            JSON.parse(targetMemeberAccessCode).memberAccessCode
                        }
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={({ target }) => setUserCode(target.value)}
                    />
                </div>
                <div
                    className="col-12"
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <button className="btn btn-primary" type="submit">
                        동아리원 접속코드 변경
                    </button>
                </div>
            </form>
        </div>
    );
}

export async function getServerSideProps() {
    const response = await MemberAccessCode.findOne({});
    const targetMemeberAccessCode = JSON.stringify(response);
    return { props: { targetMemeberAccessCode } };
}
