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
            const startNum = Number(
                startTime?.slice(0, 2) + startTime?.slice(3, 5)
            );
            const endNum = Number(endTime?.slice(0, 2) + endTime?.slice(3, 5));
            const dayEvent = await Event.find({
                date,
            });
            const otherReservation = dayEvent.filter((item) => {
                if (String(item._id) === id) {
                    return false;
                } else {
                    return true;
                }
            });
            const testingArray = otherReservation
                .map((item) => {
                    const existStartNum = Number(
                        item.startTime?.slice(0, 2) +
                            item.startTime?.slice(3, 5)
                    );
                    const existEndNum = Number(
                        item.endTime?.slice(0, 2) + item.endTime?.slice(3, 5)
                    );
                    if (existStartNum >= endNum || existEndNum <= startNum) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .filter((item) => {
                    if (item == false) {
                        return true;
                    }
                });
            if (testingArray.length === 0) {
                await Event.findByIdAndUpdate(id, {
                    date,
                    startTime,
                    endTime,
                    name,
                    detail,
                    createdAt: Date.now(),
                });
                return res.status(200).json({
                    statusCode: "200",
                    message: "예약이 완료되었습니다.",
                });
            } else {
                return res.status(200).json({
                    statusCode: "201",
                    message: "예약시간이 겹칩니다.",
                });
            }
        } catch {
            return res.status(200).json({
                statusCode: "500",
                message: "예약 변경을 실패했습니다.",
            });
        }
    }
}
