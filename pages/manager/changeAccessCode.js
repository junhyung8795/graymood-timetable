import Seo from "../../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ManagerAccessCode from "../../db/schema/managerAccessCode";

export default function ChangeManagerAccessCode({ targetManagerAccessCode }) {
    const router = useRouter();
    const [userCode, setUserCode] = useState(
        JSON.parse(targetManagerAccessCode).managerAccessCode
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
        const response = await fetch("/api/manager/changeAccessCode", {
            method: "POST",
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
                    router.push("/manager/changeAccessCode");
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
                backgroundColor: "#111827",
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
            <Seo title="Change Manager Code" />
            <div className="title">
                <h1>Graymood Timetable</h1>
            </div>
            <h1>관리자 접속코드 변경페이지</h1>
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
                            JSON.parse(targetManagerAccessCode)
                                .managerAccessCode
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
                        관리자 접속코드 변경
                    </button>
                </div>
            </form>
        </div>
    );
}

export async function getServerSideProps() {
    const response = await ManagerAccessCode.findOne({});
    const targetManagerAccessCode = JSON.stringify(response);
    return { props: { targetManagerAccessCode } };
}
