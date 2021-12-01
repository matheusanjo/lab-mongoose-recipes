const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const DB_NAME = `Recipe`;

// Connection to the database "recipe-app"
mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (connObj) => {
    // Run your code here, after you have insured that the connection was made
    console.log(`Conectado ao banco ${connObj.connections[0].name} com SUCESSAGEM`);
    try{
      
      const creatRecipe = await Recipe.create({

        title:"Hamburguer de miojo",
        level: "Easy Peasy",
        ingredients: ["miojo", "hamburguer", "cheddar", "1 ovo", "cebolinha", "bacon"],
        cusine: "Brasileira",
        dishType: "snack",
        duration: 11,
        creator: "Otaviao",
        created: "2013-08-15",

      });

      await Recipe.insertMany(data);

      await Recipe.findOneAndUpdate(
        {title:"Chocolate Chip Cookies"},
        { $set: {level: "UltraPro Chef" }},

        {new: true}
      );

      await Recipe.deleteOne({
        title: "Carrot Cake",
      });

    }
    catch(err){
      console.log(err);
    }

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
