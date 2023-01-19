import MemberAccessCode from "../../../db/schema/memberAccessCode";

export default async function changeMemberCode(req, res) {
    const userCode = req.body.userCode;
    const newCode = await MemberAccessCode.findOne({});
    newCode.memberAccessCode = userCode;
    await newCode.save();
    console.log(newCode);
    console.log("동아리원코드변경완료");
    return res.status(200).json({
        statusCode: 200,
        message: "동아리원 인증코드가 변경되었습니다.",
    });
}
