"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const packageRoutes_1 = __importDefault(require("./routes/packageRoutes"));
const deliveryRoute_1 = __importDefault(require("./routes/deliveryRoute"));
const pathRoutes_1 = __importDefault(require("./routes/pathRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const userController_1 = require("./controllers/userController");
const cors_1 = __importDefault(require("cors"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: false,
    secret: "bla bla bla",
    // store: new mongoose({
    //   url: process.env.MONGODB_URI,
    //   collection: 'sessions'
    // })
}));
app.use((0, morgan_1.default)("dev"));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
require("./utils/passport");
(0, db_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/package", packageRoutes_1.default);
app.use("/api/delivery", deliveryRoute_1.default);
app.use("/api/admin/path", pathRoutes_1.default);
app.get("/auth/google/callback", passport_1.default.authenticate("google", {
    // successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
    session: false,
}), userController_1.authUser);
if (process.env.NODE_ENV === "production") {
    // if(true){
    const __dirname = path_1.default.resolve();
    app.use(express_1.default.static(path_1.default.join(__dirname, "/frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "frontend", "build", "index.html"));
    });
}
else {
    app.get("/", (req, res) => {
        // res.sendFile(path.join(__dirname, "uploads/image-1645260047444.png"));
        res.send("Api is running " + __dirname);
    });
}
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    console.log('NODE_ENV: ', process.env.NODE_ENV);
});
