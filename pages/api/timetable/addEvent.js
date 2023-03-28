import Event from "../../../db/schema/event";

export default async function addEvent(req, res) {
    if (req.method === "POST") {
        try {
            const name = req.body.name;
            const detail = req.body.detail;
            const date = req.body.date;
            const startTime = req.body.modifiedStartTime;
            const endTime = req.body.modifiedEndTime;
            const password = req.body.password;
            const startNum = Number(
                startTime?.slice(0, 2) + startTime?.slice(3, 5)
            );
            const endNum = Number(endTime?.slice(0, 2) + endTime?.slice(3, 5));
            const otherReservation = await Event.find({
                date,
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
                    if (item === false) {
                        return true;
                    }
                });
            if (testingArray.length === 0) {
                await Event.insertMany({
                    name,
                    detail,
                    date,
                    startTime,
                    endTime,
                    password,
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
            return res.status(500).json({
                statusCode: "500",
                message: "서버오류로 예약을 실패했습니다.",
            });
        }
    }
}

export const config = {
    runtime: "experimental-edge",
};
