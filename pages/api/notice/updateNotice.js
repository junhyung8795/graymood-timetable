import Notice from "../../../db/schema/notice";
import logger from "@/utils/logger";

export default async function updateNotice(req, res) {
    if (req.method === "PUT") {
        try {
            const noticeDetail = req.body.noticeDetail;
            const noticeTitle = req.body.noticeTitle;
            const _id = req.body._id;
            const newNotice = await Notice.findById(_id);
            newNotice.detail = noticeDetail;
            newNotice.title = noticeTitle;
            await newNotice.save();
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
            return res.status(200).json({
                statusCode: "500",
                message: "공지사항 변경을 실패했습니다.",
            });
        }
    }
}
