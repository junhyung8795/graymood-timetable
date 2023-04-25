import pino from "pino";
import path from "path";

const logger = pino(
    {
        level: "error",
        formatters: {
            level: (label) => ({ level: label }),
        },
        timestamp: () => `,"time":"${new Date().toISOString()}"`,
    },
    pino.destination({
        dest: path.join(process.cwd(), "logs", "app.log"),
        rotate: {
            size: "1M",
            maxFiles: 10,
            compress: true,
        },
    })
);

export default logger;
