const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const { mongoose } = require("./db/db");
const { Idea } = require("./model/Idea");
const methodOverride = require("method-override");

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//body parser midllware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home", {
    title: " Welcome "
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/ideas/add", (req, res) => {
  res.render("ideas/add");
});

app.get("/ideas/edit/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(result => {
      res.render("ideas/edit", { result });
    })
    .catch(err => {
      console.log("error occure ", err);
    });
});
app.get("/ideas", (req, res) => {
  Idea.find({})
    .sort({ date: "desc" })
    .then(result => {
      res.render("ideas/index", { result });
    })
    .catch(err => {
      return err;
    });
});

app.post("/ideas/add", (req, res) => {
  let errors = [];
  let title = req.body.title;
  let details = req.body.details;
  console.log(JSON.stringify(req.body.title, undefined, 2));

  if (title.length < 2) {
    errors.push({ text: "Title not valid !" });
  }
  if (details.length < 2) {
    errors.push({ text: "Details not valid !" });
  }
  if (!title) {
    errors.push({ text: "Text is required" });
  }
  if (!details) {
    errors.push({ text: "Details : Details is required" });
  }
  // if (! typeOf(title) === "string") {
  //     errors.push({ text: 'Dont use numbers !' });
  // }
  // if (!typeOf(details) === "string") {
  //     errors.push({ text: "Dont use numbers !" });
  // }

  if (errors.length > 0) {
    res.render("ideas/add", {
      errors,
      title,
      details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newUser)
      .save()
      .then(result => {
        res.redirect("/ideas");
      })
      .catch(err => {
        console.log(err);
      });
  }
});

//edit form process
app.put("/ideas/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(result => {
      result.title = req.body.title;
      result.details = req.body.details;
      result
        .save()
        .then(result => {
          res.redirect("/ideas");
        })
        .catch(err => {
          console.log("erros found", err);
        });
    })
    .catch(err => {
      console.log("erros found ", err);
    });
});

//delete
app.delete('/idea/:id', (req, res) =>
 {
   Idea.findByIdAndDelete({_id : req.params.id})
  .then(() => {
     res.redirect('/ideas');
  }).catch((err) => {
console.log('errors found',err);
  });
})
 
const Port = process.env.process || 3000;

app.listen(Port, () => {
  console.log(` App listening on port : ${Port}!`);
});
