import Event from "../../../db/schema/event";

export default async function deleteEvent(req, res) {
    if (req.method === "DELETE") {
        try {
            await Event.findOneAndDelete({
                _id: req.body.id,
            });
            return res.status(200).json({
                statusCode: "200",
                message: "예약이 삭제되었습니다.",
            });
        } catch {
            return res.status(200).json({
                statusCode: "500",
                message: "예약 삭제를 실패하였습니다.",
            });
        }
    }
}
