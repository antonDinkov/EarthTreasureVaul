const { Router } = require("express");

//TODO replace with real router according to exam description
const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    const minerals = [];
    res.render('home', { minerals });
})

module.exports = { homeRouter }