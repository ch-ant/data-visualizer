const getDate = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.info(`[${getDate()}] [INFO] [${namespace}]\n${message}\n`, object);
    } else {
        console.info(`[${getDate()}] [INFO] [${namespace}]\n${message}\n`);
    }
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.warn(`[${getDate()}] [WARN] [${namespace}]\n${message}\n`, object);
    } else {
        console.warn(`[${getDate()}] [INFO] [${namespace}]\n${message}\n`);
    }
};

const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.error(`[${getDate()}] [ERROR] [${namespace}]\n${message}\n`, object);
    } else {
        console.error(`[${getDate()}] [ERROR] [${namespace}]\n${message}\n`);
    }
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.debug(`[${getDate()}] [DEBUG] [${namespace}]\n${message}\n`, object);
    } else {
        console.debug(`[${getDate()}] [DEBUG] [${namespace}]\n${message}\n`);
    }
};

export default {
    info,
    warn,
    error,
    debug
};
