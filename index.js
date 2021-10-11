const app = require('./src/server/server');
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("App is running on port:", PORT);
});