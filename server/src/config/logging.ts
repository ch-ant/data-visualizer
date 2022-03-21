const getTimeStamp = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}]\n${message}\n`, object);
    } else {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}]\n${message}\n`);
    }
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}]\n${message}\n`, object);
    } else {
        console.warn(`[${getTimeStamp()}] [INFO] [${namespace}]\n${message}\n`);
    }
};

const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}]\n${message}\n`, object);
    } else {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}]\n${message}\n`);
    }
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}]\n${message}\n`, object);
    } else {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}]\n${message}\n`);
    }
};

export default {
    info,
    warn,
    error,
    debug
};
