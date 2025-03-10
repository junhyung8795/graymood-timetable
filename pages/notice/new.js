import Seo from "../../components/Seo";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function AddNotice() {
    const router = useRouter();
    const [noticeDetail, setNoticeDetail] = useState("");
    const [noticeTitle, setNoticeTitle] = useState("");
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (session?.user?.name !== "manager") {
            router.push("/");
        }
        return;
    }, [router, session?.user?.name]);

    const handleAddNotice = async (e) => {
        e.preventDefault();
        setLoading(true);
        await fetch(`/api/notice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ noticeDetail, noticeTitle }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === "200") {
                    router.push("/notice");
                } else if (data.statusCode === "500") {
                    detailForm.value = "";
                    detailForm.placeholder = data.message;
                    router.push("/notice/new");
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
                color: "black",
            }}
        >
            {loading ? (
                <div style={{ position: "absolute", top: "0px", right: "0px" }}>
                    <h2>...loading</h2>
                </div>
            ) : (
                <div></div>
            )}
            <Seo title="Add Notice" />

            <div className="title" style={{ color: "black" }}>
                <h1>Graymood Timetable</h1>
                <h1>동방사용 필독사항 추가페이지</h1>
            </div>

            <form
                className="input-group mb-3"
                onSubmit={handleAddNotice}
                style={{ display: "flex" }}
            >
                <div className="input-group">
                    <span className="input-group-text">제목</span>
                    <textarea
                        id="titleForm"
                        className="form-control"
                        placeholder=""
                        defaultValue={""}
                        onChange={({ target }) => setNoticeTitle(target.value)}
                        required={true}
                    />
                </div>

                <div className="mb-3">
                    <textarea
                        id="detailForm"
                        className="form-control"
                        rows={6}
                        style={{ width: "80vw", marginTop: "50px" }}
                        placeholder="공지사항을 작성해주세요"
                        onChange={({ target }) => setNoticeDetail(target.value)}
                        required={true}
                    />
                </div>

                <div className="col-12" style={{ marginTop: "15px" }}>
                    <button className="btn btn-primary" type="submit">
                        공지사항 추가
                    </button>
                </div>
            </form>
        </div>
    );
}
