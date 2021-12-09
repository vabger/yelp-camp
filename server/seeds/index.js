const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/CampGround");
const User = require("../models/User");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil nostrum maiores, tempora porro quae impedit explicabo similique itaque sint. Odit ab repellat blanditiis error tenetur possimus saepe officia nihil et. Officia eum excepturi mollitia culpa commodi accusamus dicta ratione placeat reiciendis illo, modi odio nemo obcaecati non! Nihil beatae quasi repudiandae sit corporis, nulla expedita, provident iure nemo ut molestias.Voluptas nam temporibus labore unde. Cupiditate sequi vel voluptas eius repudiandae fugit velit dicta at voluptatem eum, numquam voluptate officiis rem magnam doloribus laboriosam ipsam aliquid labore eos ullam in.",
      price: 10.0,
      images: [
        {
          url: "http://localhost:5000/uploads/campgrounds/" + i + ".jpg",
        },
      ],
      createdBy: await User.findById("617feffcef180a484d94291d"),
    });
    console.log(await camp.save());
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
