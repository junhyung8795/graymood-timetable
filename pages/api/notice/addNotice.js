import Notice from "../../../db/schema/notice";
import logger from "@/utils/logger";

export default async function addNotice(req, res) {
    if (req.method === "POST") {
        try {
            const noticeDetail = req.body.noticeDetail;
            const noticeTitle = req.body.noticeTitle;
            const newNotice = await Notice.insertMany({
                title: noticeTitle,
                detail: noticeDetail,
            });
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
            return res.status(200).json({
                statusCode: "500",
                message: "공지사항 추가를 실패했습니다.",
            });
        }
    }
}
