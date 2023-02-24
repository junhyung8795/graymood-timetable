import Seo from "../../../components/Seo";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Notice from "../../../db/schema/notice";

export default function ChangeNotice({ targetNotice }) {
    const router = useRouter();
    const [noticeDetail, setNoticeDetail] = useState(
        JSON.parse(targetNotice).detail
    );
    const [noticeTitle, setNoticeTitle] = useState(
        JSON.parse(targetNotice).title
    );

    const { data: session, status } = useSession();
    useEffect(() => {
        if (session?.user?.name !== "manager") {
            router.push("/");
        }
        return;
    }, []);
    const handleChangeNotice = async (e) => {
        e.preventDefault();
        const _id = String(router.query._id);
        await fetch(`/api/notice/updateNotice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ noticeDetail, noticeTitle, _id }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === "200") {
                    router.push("/notice");
                } else if (data.statusCode === "500") {
                    detailForm.value = "";
                    detailForm.placeholder = data.message;
                    router.push(`/notice/changeNotice/${_id}`);
                } else {
                    router.push("/notice");
                }
            });
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
            }}
        >
            <Seo title="Change Notice" />

            <div className="title">
                <h1>Graymood Timetable</h1>
            </div>

            <h1>동방사용 필독사항 변경페이지</h1>

            <form
                className="input-group mb-3"
                onSubmit={handleChangeNotice}
                style={{ display: "flex" }}
            >
                <div className="input-group">
                    <span className="input-group-text">제목</span>
                    <textarea
                        id="titleForm"
                        className="form-control"
                        placeholder="제목을 작성해주세요"
                        defaultValue={noticeTitle}
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
                        defaultValue={noticeDetail}
                        onChange={({ target }) => setNoticeDetail(target.value)}
                        required={true}
                    />
                </div>

                <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                        공지사항 변경
                    </button>
                </div>
            </form>
        </div>
    );
}

export async function getServerSideProps(context) {
    const response = await Notice.findById(context.query._id);
    const targetNotice = JSON.stringify(response);

    return { props: { targetNotice } };
}
