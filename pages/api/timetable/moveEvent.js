import Event from "../../../db/schema/event";
import logger from "@/utils/logger";

export default async function moveEvent(req, res) {
    if (req.method === "PUT") {
        try {
            const date = req.body.date;
            const startTime = req.body.startTime;
            const endTime = req.body.endTime;
            const id = req.body.id;
            await Event.findByIdAndUpdate(id, {
                date,
                startTime,
                endTime,
                createdAt: Date.now(),
            });
            return res.status(200).json({
                statusCode: "200",
                message: "예약이 완료되었습니다.",
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
                message: "예약을 실패했습니다.",
            });
        }
    }
}
