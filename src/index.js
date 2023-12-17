import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
app.on("error", (err) => {
    console.log("Server error: ", err);
});


