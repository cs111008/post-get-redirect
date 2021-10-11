const app = require('./src/server/server');
const PORT = 4000;

app.listen(PORT, () => {
    console.log("App is running on port:", PORT);
});