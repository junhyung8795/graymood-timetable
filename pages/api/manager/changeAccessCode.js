import ManagerAccessCode from "../../../db/schema/managerAccessCode";

export default async function changeManagerCode(req, res) {
    const userCode = req.body.userCode;
    const newCode = await ManagerAccessCode.findOne({});
    newCode.managerAccessCode = userCode;
    await newCode.save();
    console.log("관리자코드변경완료");
    return res.status(200).json({
        statusCode: 200,
        message: "관리자 인증코드가 변경되었습니다.",
    });
}
