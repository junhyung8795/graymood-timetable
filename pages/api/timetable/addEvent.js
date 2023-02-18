import Event from "../../../db/schema/event";

export default async function addEvent(req, res) {
    if (req.method === "POST") {
        try {
            const name = req.body.name;
            const detail = req.body.detail;
            const date = req.body.date;
            const startTime = req.body.modifiedStartTime;
            const endTime = req.body.modifiedEndTime;
            const testAlreadyExist = await Event.exists({
                date,
                startTime,
                endTime,
            });
            if (testAlreadyExist) {
                return res.status(200).json({
                    statusCode: "200",
                    message: "예약 시간이 겹칩니다.",
                });
            }
            await Event.insertMany({
                name,
                detail,
                date,
                startTime,
                endTime,
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
