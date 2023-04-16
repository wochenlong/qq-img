// 导入 koishi 模块中的 Context、Logger、Schema 和 h
import { Context, Logger, Schema, h } from "koishi";

// 定义插件名称
export const name = "qq-img";

// 定义插件使用说明
export const usage = `get+@你想获取头像的用户`;

// 创建一个 Logger 实例，用于记录日志
const logger = new Logger("qq-img");

// 定义 Config 接口
export interface Config {}

// 定义 Config 的 Schema
export const Config: Schema<Config> = Schema.object({});

// 定义 apply 函数，用于将插件应用到 koishi 实例中
export function apply(ctx: Context) {
  // 创建一个名为 "get" 的指令，并设置别名为 "头像"
  const cmd = ctx
    .command("get", "get+@你想获取头像的用户")
    .alias("头像")
    .action(({ session }, input) => {
      // 解析输入的消息，返回一个消息段数组
      const segments = h.parse(input);

      // 记录日志
      logger.info(segments);

      // 遍历消息段数组，查找 @ 消息段
      segments.forEach((segment) => {
        if (segment.type === "at") {
          // 如果找到了 @ 消息段，发送该用户的 QQ 号和头像
          session.send(segment.attrs.id);
          session.send(
            h.image(
              `http://q.qlogo.cn/headimg_dl?dst_uin=${segment.attrs.id}&spec=640&img_type=jpg`
            )
          );
        }
      });

      // 发送获取成功的消息
      session.send("获取成功");
    });
}
