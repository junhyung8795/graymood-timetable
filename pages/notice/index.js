import Seo from "../../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Notice from "../../db/schema/notice";
import React, { useEffect, useState } from "react";

export default function NoticePage({ notice }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!session) {
            router.push("/");
        }
        return;
    }, []);

    const handleLogout = (e) => {
        signOut({ callbackUrl: "/" });
    };

    const handleDeleteNotice = async (e) => {
        setLoading(true);
        await fetch("/api/notice/deleteNotice", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: e.target.id }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === "200") {
                    window.location.reload(true);
                } else if (data.statusCode === "500") {
                    window.location.reload(true);
                }
            });
        setLoading(false);
        return;
    };
    return (
        <div
            style={{
                backgroundColor: "#111827",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                padding: "10px 10px",
                overflow: "scroll",
                color: "white",
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
            <Seo title="Notice" />
            <div>
                <h1>동방 사용 필독 사항</h1>
                <nav
                    className="navbar bg-body-tertiary"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "90vw",
                    }}
                >
                    <div>
                        <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={async () => {
                                setLoading(true);
                                await router.push("/timeTable");
                                setLoading(false);
                            }}
                            style={{
                                color: "blue",
                            }}
                        >
                            동방 시간표
                        </button>
                    </div>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </nav>
            </div>
            <div>
                <ul
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "1F2937",
                        paddingLeft: "0px",
                    }}
                >
                    {notice.map((item) => {
                        return (
                            <li key={item._id}>
                                <div
                                    style={{
                                        backgroundColor: "#1F2937",
                                        color: "white",
                                        padding: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        borderRadius: "10px",
                                        width: "80vw",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <div>
                                        <h1 style={{ fontSize: "20px" }}>
                                            {item.title}
                                        </h1>
                                    </div>
                                    <div
                                        style={{ whiteSpace: "pre-line" }}
                                        className="mb-3"
                                    >
                                        <h1 style={{ fontSize: "16px" }}>
                                            {item.detail}
                                        </h1>
                                    </div>
                                    {session?.user.name === "manager" ? (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <button
                                                type="button"
                                                className="btn btn-warning"
                                                onClick={async () => {
                                                    setLoading(true);
                                                    await router.push(
                                                        `/notice/updateNotice/${item._id}`
                                                    );
                                                    setLoading(false);
                                                }}
                                                style={{
                                                    color: "black",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                공지사항 변경
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={handleDeleteNotice}
                                                id={item._id}
                                            >
                                                x
                                            </button>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
                {session?.user.name === "manager" ? (
                    <div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={async () => {
                                    setLoading(true);
                                    await router.push(
                                        "/manager/changeAccessCode"
                                    );
                                    setLoading(false);
                                }}
                                style={{
                                    marginBottom: "10px",
                                    color: "black",
                                }}
                            >
                                관리자 접속코드 변경
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={async () => {
                                    setLoading(true);
                                    router.push("/member/changeAccessCode");
                                    setLoading(false);
                                }}
                                style={{
                                    marginBottom: "10px",
                                    color: "black",
                                }}
                            >
                                동아리원 접속코드 변경
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={async () => {
                                    setLoading(true);
                                    router.push("/notice/addNotice");
                                    setLoading(false);
                                }}
                                style={{
                                    marginBottom: "10px",
                                    color: "black",
                                }}
                            >
                                동방사용 필독사항 추가
                            </button>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const noticeArray = await Notice.find({});
    const notice = noticeArray.map((doc) => {
        const item = doc.toObject();
        item._id = item._id.toString();
        return item;
    });

    return { props: { notice } };
}
