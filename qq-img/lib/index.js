"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.usage = exports.name = void 0;
const koishi_1 = require("koishi");
exports.name = "qq-img";
exports.usage = `get+@你想获取头像的用户
`;
const logger = new koishi_1.Logger("qq-img");
exports.Config = koishi_1.Schema.object({});
function apply(ctx) {
    const cmd = ctx
        .command("get", "get+@你想获取头像的用户")
        .alias("头像")
        .action(({ session }, input) => {
        const segments = koishi_1.h.parse(input);
        logger.info(segments);
        segments.forEach((segment) => {
            if (segment.type === "at") {
                session.send(segment.attrs.id);
                session.send(koishi_1.h.image(`http://q.qlogo.cn/headimg_dl?dst_uin=${segment.attrs.id}&spec=640&img_type=jpg`));
            }
        });
        session.send("获取成功");
    });
}
exports.apply = apply;
