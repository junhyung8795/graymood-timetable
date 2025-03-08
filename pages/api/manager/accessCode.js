import ManagerAccessCode from "../../../db/schema/managerAccessCode";
import MemberAccessCode from "../../../db/schema/memberAccessCode";
import logger from "@/utils/logger";

export default async function changeManagerCode(req, res) {
    if (req.method === "PUT") {
        try {
            const userCode = req.body.userCode;
            const newCode = await ManagerAccessCode.findOne({});
            const memberCode = await MemberAccessCode.findOne({});
            newCode.managerAccessCode = userCode;
            if (newCode.managerAccessCode === memberCode.memberAccessCode) {
                return res.status(400).json({
                    statusCode: "400",
                    message: "동아리원 접속코드와 같습니다.",
                });
            }
            await newCode.save();
            return res.status(200).json({
                statusCode: "200",
                message: "관리자 인증코드가 변경되었습니다.",
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
                message: "관리자 인증코드 변경을 실패했습니다.",
            });
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        return res.status(405).json({
            statusCode: "405",
            message: `Method ${req.method} Not Allowed`,
        });
    }
}
