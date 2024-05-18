module.exports = (app) => {
    //user routes
    app.post("/signup", app.api.user.save);
    app.post("/signin", app.api.auth.signin);

    //task routes
    app.route("/tasks")
        .all(app.config.passport.authenticate())
        .get(app.api.task.getTasks)
        .post(app.api.task.save);

    app.route("/tasks/:id")
        .all(app.config.passport.authenticate())
        .delete(app.api.task.remove);

    app.route("/tasks/:id/toggle")
        .all(app.config.passport.authenticate())
        .put(app.api.task.toggleTask);
};
