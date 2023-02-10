import Event from "../../../db/schema/event";

export default async function updateEvent(req, res) {
    if (req.method === "POST") {
        try {
            const name = req.body.name;
            const detail = req.body.detail;
            const date = req.body.date;
            const startTime = req.body.modifiedStartTime;
            const endTime = req.body.modifiedEndTime;
            const id = req.body.id;
            const testAlreadyExis = await Event.exists({
                date,
                startTime,
                endTime,
            });
            console.log(name, detail, date, startTime, endTime, id);
            if (testAlreadyExis) {
                console.log("예약 시간이 겹칩니다.");
                return res.status(200).json({
                    statusCode: "200",
                    message: "예약 시간이 겹칩니다.",
                });
            }
            await Event.findByIdAndUpdate(id, {
                date,
                startTime,
                endTime,
                name,
                detail,
            });
            console.log("예약 변경 완료");
            return res.status(200).json({
                statusCode: "200",
                message: "예약이 변경되었습니다.",
            });
        } catch {
            return res.status(200).json({
                statusCode: "500",
                message: "예약 변경을 실패했습니다.",
            });
        }
    }
}
