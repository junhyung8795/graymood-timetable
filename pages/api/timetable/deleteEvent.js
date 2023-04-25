import Event from "../../../db/schema/event";
import logger from "@/utils/logger";

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
        } catch (error) {
            const errorMessage = error.message;
            const errorStack = error.stack;
            const errorName = error.name;
            logger.error(
                `Error: ${errorMessage}, Stack: ${errorStack}, Name: ${errorName}`
            );
            return res.status(200).json({
                statusCode: "500",
                message: "예약 삭제를 실패하였습니다.",
            });
        }
    }
}
