import { Context, Logger, Schema, h } from "koishi";

export const name = "qq-img";
export const usage = `get+@你想获取头像的用户
`;

const logger = new Logger("qq-img");

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  const cmd = ctx
    .command("get", "get+@你想获取头像的用户")
    .alias("头像")
    .action(({ session }, input) => {
      const segments = h.parse(input);
      logger.info(segments);
      segments.forEach((segment) => {
        if (segment.type === "at") {
          session.send(segment.attrs.id);
          session.send(
            h.image(
              `http://q.qlogo.cn/headimg_dl?dst_uin=${segment.attrs.id}&spec=640&img_type=jpg`
            )
          );
        }
      });
      session.send("获取成功");
    });
}
