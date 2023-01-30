import Notice from "../../../db/schema/notice";

export default async function deleteNotice(req, res) {
    if (req.method === "DELETE") {
        try {
            await Notice.findOneAndDelete({
                _id: req.body._id,
            });
            return res.status(200).json({
                statusCode: "200",
                message: "동방사용 필독사항이 삭제되었습니다.",
            });
        } catch {
            return res.status(200).json({
                statusCode: "500",
                message: "동방사용 필독사항 삭제를 실패하였습니다.",
            });
        }
    }
}
