import UserAccessCode from "../../../db/schema/userAccessCode";
import { getSession } from "../../../lib/get-session.js";

export default async function memberLogin(req, res) {
    const session = await getSession(req, res);
    session.views = session.views ? session.views + 1 : 1;
    const typedCode = req.body.userAccessCode;
    const realCode = await UserAccessCode.findOne({
        userAccessCode: typedCode,
    });
    session.commit();
    console.log(realCode);
    console.log(req.session);
    if (realCode) {
        res.status(200).json({
            userAccessCode: typedCode,
            message: "로그인 성공",
            statusCode: "200",
            views: session.views,
        });
    } else {
        res.status(200).json({
            userAccessCode: "",
            message: "입장코드가 일치하지 않습니다.",
            statusCode: "401",
            views: session.views,
        });
    }
}
