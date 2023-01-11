import UserAccessCode from "../../db/schema/userAccessCode";

export default async function memberLogin(req, res) {
    const typedCode = req.body.accessCode;
    const realCode = await UserAccessCode.findOne({
        userAccessCode: typedCode,
    });
    console.log(realCode);
    if (realCode) {
        res.status(200).json({
            accessCode: typedCode,
            message: "로그인 성공",
            statusCode: "200",
        });
    } else {
        res.status(200).json({
            accessCode: "",
            message: "입장코드가 일치하지 않습니다.",
            statusCode: "401",
        });
    }
}
