import ManagerAccessCode from "../../../db/schema/managerAccessCode";
import MemberAccessCode from "../../../db/schema/memberAccessCode";
import logger from "@/utils/logger";
export default async function changeMemberCode(req, res) {
    if (req.method === "PUT") {
        try {
            const userCode = req.body.userCode;
            const newCode = await MemberAccessCode.findOne({});
            const managerCode = await ManagerAccessCode.findOne({});
            newCode.memberAccessCode = userCode;
            if (newCode.memberAccessCode === managerCode.managerAccessCode) {
                return res.status(409).json({
                    statusCode: "409",
                    message: "관리자 접속코드와 같습니다.",
                });
            }
            await newCode.save();
            return res.status(200).json({
                statusCode: "200",
                message: "동아리원 인증코드가 변경되었습니다.",
            });
        } catch (error) {
            const errorMessage = error.message;
            const errorStack = error.stack;
            const errorName = error.name;
            logger.error(
                `Error: ${errorMessage}, Stack: ${errorStack}, Name: ${errorName}`
            );
            await mongoose.disconnect();
            return res.status(500).json({
                statusCode: "500",
                message: "동아리원 인증코드 변경을 실패했습니다.",
            });
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        return res.status(405).json({
            statusCode: "405",
            message: `${req.method} 는 허용되지 않는 메소드입니다.`,
        });
    }
}
