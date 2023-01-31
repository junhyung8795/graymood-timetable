import Notice from "../../../db/schema/notice";

export default async function changeNotice(req, res) {
    if (req.method === "POST") {
        try {
            const noticeDetail = req.body.noticeDetail;
            const noticeTitle = req.body.noticeTitle;
            const _id = req.body._id;
            const newNotice = await Notice.findById(_id);
            console.log(newNotice);
            newNotice.detail = noticeDetail;
            newNotice.title = noticeTitle;
            console.log(newNotice);
            await newNotice.save();
            console.log("공지사항 변경 완료");
            // const newCode = await MemberAccessCode.findOne({});
            // const managerCode = await ManagerAccessCode.findOne({});
            // newCode.memberAccessCode = userCode;
            // if (newCode.memberAccessCode === managerCode.managerAccessCode) {
            //     return res.status(200).json({
            //         statusCode: "500",
            //         message: "관리자 접속코드와 같습니다.",
            //     });
            // }
            // await newCode.save();
            // console.log("동아리원코드변경완료");
            return res.status(200).json({
                statusCode: "200",
                message: "공지사항이 변경되었습니다.",
            });
        } catch {
            return res.status(200).json({
                statusCode: "500",
                message: "공지사항 변경을 실패했습니다.",
            });
        }
    }
}
