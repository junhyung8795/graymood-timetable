import Seo from "../../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MemberAccessCode from "../../db/schema/memberAccessCode";

export default function ChangeMemberAccessCode({ targetMemeberAccessCode }) {
    const router = useRouter();
    const [userCode, setUserCode] = useState(
        JSON.parse(targetMemeberAccessCode).memberAccessCode
    );
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.user?.name !== "manager") {
            router.push("/");
        }
        return;
    });

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
                    router.push("/member/changeAccessCode");
                } else if (data.statusCode === "500") {
                    changeForm.value = "";
                    changeForm.placeholder = data.message;
                    router.push("/member/changeAccessCode");
                } else {
                    router.push("/notice");
                }
            });
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
                backgroundColor: "#111827",
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
