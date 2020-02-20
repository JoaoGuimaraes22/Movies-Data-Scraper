const puppeteer = require("puppeteer");
const express = require("express");
const router = express.Router();

const scrapeProduct = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const movieTitles = await page.$$eval(
    ".Slide > .PosterContent > a > h3",
    (a) => a.map((title) => title.textContent)
  );

  const movieImgs = await page.$$eval(".Slide > a > img", (img) =>
    img.map((image) => image.src)
  );

  const releasedDates = await page.$$eval(
    ".Slide > .PosterContent > .Headline--eyebrow > p > .MoviePosters__released-month",
    (dat) => dat.map((date) => date.textContent)
  );

  await browser.close();

  return { movieTitles, movieImgs, releasedDates };
};

router.get("/", async (req, res, next) => {
  const scrapedData = await scrapeProduct("https://www.amctheatres.com/movies");
  res.send(scrapedData);
});

module.exports = router;
