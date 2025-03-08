import Event from "../../../db/schema/event";
import logger from "@/utils/logger";

export default async function handler(req, res) {
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
                return res.status(409).json({
                    statusCode: "409",
                    message: "예약시간이 겹칩니다.",
                });
            }
        } catch (error) {
            const errorMessage = error.message;
            const errorStack = error.stack;
            const errorName = error.name;
            logger.error(
                `Error: ${errorMessage}, Stack: ${errorStack}, Name: ${errorName}`
            );
            return res.status(500).json({
                statusCode: "500",
                message: "서버오류로 예약을 실패했습니다.",
            });
        }
    } else if (req.method === "PUT") {
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
                return res.status(409).json({
                    statusCode: "409",
                    message: "예약시간이 겹칩니다.",
                });
            }
        } catch (error) {
            const errorMessage = error.message;
            const errorStack = error.stack;
            const errorName = error.name;
            logger.error(
                `Error: ${errorMessage}, Stack: ${errorStack}, Name: ${errorName}`
            );
            return res.status(500).json({
                statusCode: "500",
                message: "예약 변경을 실패했습니다.",
            });
        }
    } else if (req.method === "PATCH") {
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
            return res.status(500).json({
                statusCode: "500",
                message: "예약을 실패했습니다.",
            });
        }
    } else if (req.method === "DELETE") {
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
            return res.status(500).json({
                statusCode: "500",
                message: "예약 삭제를 실패하였습니다.",
            });
        }
    } else {
        res.setHeader("Allow", ["POST", "PUT", "PATCH", "DELETE"]);
        return res.status(405).json({
            statusCode: "405",
            message: `Method ${req.method} Not Allowed`,
        });
    }
}
