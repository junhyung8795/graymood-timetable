import dbConnect from "../../../db/dbConnect";
import Notice from "../../../db/schema/notice";
import logger from "@/utils/logger";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "POST") {
        try {
            const { noticeDetail, noticeTitle } = req.body;
            const newNotice = new Notice({
                title: noticeTitle,
                detail: noticeDetail,
            });
            await newNotice.save();
            return res.status(200).json({
                statusCode: "200",
                message: "공지사항이 추가되었습니다.",
            });
        } catch (error) {
            const errorMessage = error.message;
            const errorStack = error.stack;
            const errorName = error.name;
            logger.error(
                `Error: ${errorMessage}, Stack: ${errorStack}, Name: ${errorName}`
            );
            return res.status(500).json({
                statusCode: "500",
                message: "공지사항 추가를 실패했습니다.",
            });
        }
    } else if (req.method === "PUT") {
        try {
            const { noticeDetail, noticeTitle, _id } = req.body;
            const notice = await Notice.findById(_id);
            if (!notice) {
                return res.status(404).json({
                    statusCode: "404",
                    message: "공지사항을 찾을 수 없습니다.",
                });
            }
            notice.detail = noticeDetail;
            notice.title = noticeTitle;
            await notice.save();
            return res.status(200).json({
                statusCode: "200",
                message: "공지사항이 변경되었습니다.",
            });
        } catch (error) {
            const errorMessage = error.message;
            const errorStack = error.stack;
            const errorName = error.name;
            logger.error(
                `Error: ${errorMessage}, Stack: ${errorStack}, Name: ${errorName}`
            );
            return res.status(500).json({
                statusCode: "500",
                message: "공지사항 변경을 실패했습니다.",
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const { _id } = req.body;
            await Notice.findOneAndDelete({ _id });
            return res.status(200).json({
                statusCode: "200",
                message: "동방사용 필독사항이 삭제되었습니다.",
            });
        } catch (error) {
            const errorMessage = error.message;
            const errorStack = error.stack;
            const errorName = error.name;
            logger.error(
                `Error: ${errorMessage}, Stack: ${errorStack}, Name: ${errorName}`
            );
            return res.status(500).json({
                statusCode: "500",
                message: "동방사용 필독사항 삭제를 실패하였습니다.",
            });
        }
    } else {
        res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
