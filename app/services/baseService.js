const baseService = {
    create: function (model) {
        return this.model.create(model);
    },
    findOne: function (opt) {
        opt = {where: opt};
        return this.model.findOne(opt);
    },
    update: function (val, con) {
        con = {where: con};
        delete val.id;
        return this.model.update(val, con);
    },
    delete: function (opt) {
        opt = {where: opt};
        return this.model.destroy(opt);
    }
};

export default baseService