const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63ed0fafabab4d18cf499f45",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dxi4ovuuy/image/upload/v1676915060/YelpCamp/hxfeu3a9wsyuvp5af251.jpg",
          filename: "YelpCamp/hxfeu3a9wsyuvp5af251",
        },
        {
          url: "https://res.cloudinary.com/dxi4ovuuy/image/upload/v1676915063/YelpCamp/cb38hqcyim2tkx8k4tn8.jpg",
          filename: "YelpCamp/cb38hqcyim2tkx8k4tn8",
        },
        {
          url: "https://res.cloudinary.com/dxi4ovuuy/image/upload/v1676915065/YelpCamp/fhuqepzetuacnkp1xc3x.jpg",
          filename: "YelpCamp/fhuqepzetuacnkp1xc3x",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
