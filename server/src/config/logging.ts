const DEFAULT_NAMESPACE = 'Server';

const info = (message: string, object?: any, namespace?: string) => {
    if (object) {
        console.info(`[${getDate()}] [INFO] [${namespace || DEFAULT_NAMESPACE}]\n${message}\n`, object);
    } else {
        console.info(`[${getDate()}] [INFO] [${namespace || DEFAULT_NAMESPACE}]\n${message}\n`);
    }
};

const warn = (message: string, object?: any, namespace?: string) => {
    if (object) {
        console.warn(`[${getDate()}] [WARN] [${namespace || DEFAULT_NAMESPACE}]\n${message}\n`, object);
    } else {
        console.warn(`[${getDate()}] [WARN] [${namespace || DEFAULT_NAMESPACE}]\n${message}\n`);
    }
};

const error = (message: string, object?: any, namespace?: string) => {
    if (object) {
        console.error(`[${getDate()}] [ERROR] [${namespace || DEFAULT_NAMESPACE}]\n${message}\n`, object);
    } else {
        console.error(`[${getDate()}] [ERROR] [${namespace || DEFAULT_NAMESPACE}]\n${message}\n`);
    }
};

const debug = (message: string, object?: any, namespace?: string) => {
    if (object) {
        console.debug(`[${getDate()}] [DEBUG] [${namespace || DEFAULT_NAMESPACE}]\n${message}\n`, object);
    } else {
        console.debug(`[${getDate()}] [DEBUG] [${namespace || DEFAULT_NAMESPACE}]\n${message}\n`);
    }
};

const getDate = (): string => {
    return new Date().toLocaleTimeString();
};

export default {
    info,
    warn,
    error,
    debug
};
