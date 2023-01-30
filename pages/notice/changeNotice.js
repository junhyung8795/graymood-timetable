import Seo from "../../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";

export default function ChangeNotice() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userNotice, setUserNotice] = useState("");
    useEffect(() => {}, []);

    const handleChangeNotice = async (e) => {
        e.preventDefault();
        await fetch("/api/notice/changeNotice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userNotice }),
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
                    router.push("/notice/changeNotice");
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
            <Seo title="Change Notice" />
            <div className="title">
                <h1>Graymood Timetable</h1>
            </div>
            <h1>동방사용 필독사항 변경페이지</h1>
            <form className="input-group mb-3" onSubmit={handleChangeNotice}>
                <div className="form-floating">
                    <textarea
                        className="form-control"
                        placeholder="제목"
                        id="floatingTextarea2"
                        style={{ height: "150px" }}
                    ></textarea>
                    <label for="floatingTextarea2">Comments</label>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                        Update
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
