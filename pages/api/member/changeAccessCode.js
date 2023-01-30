import MemberAccessCode from "../../../db/schema/memberAccessCode";

export default async function changeMemberCode(req, res) {
    if (req.method === "POST") {
        const userCode = req.body.userCode;
        const newCode = await MemberAccessCode.findOne({});
        newCode.memberAccessCode = userCode;
        try {
            await newCode.save();
            console.log(newCode);
            console.log("동아리원코드변경완료");
            return res.status(200).json({
                statusCode: 200,
                message: "동아리원 인증코드가 변경되었습니다.",
            });
        } catch {
            return res.status(200).json({
                statusCode: 500,
                message: "동아리원 인증코드 변경을 실패했습니다.",
            });
        }
    }
}
