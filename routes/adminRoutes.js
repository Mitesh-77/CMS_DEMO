const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';

    next();
});

/* DEFAULT ADMIN INDEX ROUTE*/

router.route('/')
    .get(adminController.index);


/* VARIOUS ADMIN POST ENDPOINTS */

router.route('/posts')
    .get(adminController.getPosts);



router.route('/posts/create')
    .get(adminController.createPostsGet)
    .post(adminController.submitPosts);


router.route('/posts/edit/:id')
    .get(adminController.editPostGetRoute)
    .put(adminController.editPostUpdateRoute);


router.route('/posts/delete/:id')
    .delete(adminController.deletePost);


/* ADMIN category ROUTES*/

router.route('/category')
    .get(adminController.getCategories);


router.route('/category/create')
    .post(adminController.createCategories);


router.route('/category/edit/:id')
    .get(adminController.editCategoriesGetRoute)
    .post(adminController.editCategoriesPostRoute);

router.route('/category/delete/:id')
    .delete(adminController.deleteCategory);



/* ADMIN Furnished ROUTES*/

router.route('/furnished')
    .get(adminController.getFurnished);


router.route('/furnished/create')
    .post(adminController.createFurnished);


router.route('/furnished/edit/:id')
    .get(adminController.editFurnishedGetRoute)
    .post(adminController.editFurnishedPostRoute);

router.route('/furnished/delete/:id')
    .delete(adminController.deleteFurnished);


/* ADMIN Header ROUTES*/
router.route('/header/create')
    .post(adminController.createHeader);

router.route('/header/edit/:id')
    .get(adminController.editHeaderGetRoute)
    .post(adminController.editHeaderPostRoute);

router.route('/header/delete/:id')
    .delete(adminController.deleteHeader);


/* ADMIN Button ROUTES*/

router.route('/button')
    .get(adminController.getButtons);


router.route('/button/create')
    .post(adminController.createButton);


router.route('/button/edit/:id')
    .get(adminController.editButtonGetRoute)
    .post(adminController.editButtonPostRoute);

router.route('/button/delete/:id')
    .delete(adminController.deleteButton);

/* ADMIN Model ROUTES*/

router.route('/model')
    .get(adminController.getModel);

router.route('/model/create')
    .post(adminController.createModel);

router.route('/model/delete/:title')
    .delete(adminController.deleteModel);

/* ADMIN Schema ROUTES*/

router.route('/schema')
    .get(adminController.getModelNames);

router.route('/schema/create/:model')
    .post(adminController.createSchema);







module.exports = router;
