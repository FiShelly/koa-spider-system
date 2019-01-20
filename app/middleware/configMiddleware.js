import config from '../../config/server.config';

export default function (_dirname) {
    return async (ctx, next) => {
        ctx._dir_path = _dirname;
        ctx._server_config = config;
        await next();
    };
}