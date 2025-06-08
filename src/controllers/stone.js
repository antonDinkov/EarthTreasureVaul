const { Router } = require("express");
const { body, validationResult } = require("express-validator");

const { parseError } = require("../util");
const { isUser } = require("../middlewares/guards");
const { create } = require("../services/stone");

//TODO replace with real router according to exam description
const stoneRouter = Router();

stoneRouter.get('/create', isUser(), async (req, res) => {
    res.render('create');
});
stoneRouter.post('/create', isUser(),
body('name').trim().isLength({ min: 2 }).withMessage('name must be atleast 2 characters long'),
body('category').trim().isLength({ min: 3 }).withMessage('category must be atleast 3 characters long'),
body('color').trim().isLength({ min: 2 }).withMessage('color must be atleast 2 characters long'),
body('image').trim().isURL({ require_tld: false }).withMessage('image must be a valid URL'),
body('location').trim().isLength({ min: 5, max: 15 }).withMessage('location must be between 5 and 15 characters long'),
body('formula').trim().isLength({ min: 3, max: 30 }).withMessage('formula must be between 3 and 30 characters long'),
body('description').trim().isLength({ min: 10 }).withMessage('description must be atleast 10 characters long'),
async (req, res) => {
    try {
        const validation = validationResult(req);
        
        if (!validation.isEmpty()) {
            throw validation.array();
        }
        const result = await create(req.body, req.user._id);
        
        res.redirect('/catalog');
    } catch (err) {
        res.render('create', { data: req.body, errors: parseError(err).errors });
    }
});

module.exports = { stoneRouter };