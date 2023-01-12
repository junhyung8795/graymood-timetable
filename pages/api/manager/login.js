import ManagerAccessCode from "../../../db/schema/managerAccessCode";

export default async function managerLogin(req, res) {
    const typedCode = req.body.managerAccessCode;
    const realCode = await ManagerAccessCode.findOne({
        managerAccessCode: typedCode,
    });
    console.log(realCode);
    if (realCode) {
        res.status(200).json({
            managerAccessCode: typedCode,
            message: "로그인 성공",
            statusCode: "200",
        });
    } else {
        res.status(200).json({
            managerAccessCode: "",
            message: "관리자코드가 일치하지 않습니다.",
            statusCode: "401",
        });
    }
}
