const { app } = require("./src/app");


app.get('/', (req, res) => {
    // res.send("tupi start front project");
    res.render('home', { title: "Home Page" , user: req.session.user });
});
app.get("/singup", (req, res) => {
    res.render('singup', { title: "Sing Up", styles: [{ css: "/css/form.css" }] });
});
app.get("/login", (req, res) => {
    res.render('login', { title: "Login", styles: [{ css: "/css/form.css" }] });
});
app.post("/singup", (req, res) => {
    req.session.user = {
        firstname: req.body.name.split(" ")[0],
         name: req.body.name,
         email: req.body.email
     };
    res.redirect("/");
});
app.post("/login", (req, res) => {
     req.session.user = {
        firstname: req.body.name.split(" ")[0],
         name: req.body.name,
         email: req.body.email
     };
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});