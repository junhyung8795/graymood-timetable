import Event from "../../../db/schema/event";

export default async function moveEvent(req, res) {
    if (req.method === "POST") {
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
        } catch {
            return res.status(200).json({
                statusCode: "500",
                message: "예약을 실패했습니다.",
            });
        }
    }
}

export const config = {
    runtime: "experimental-edge",
};
