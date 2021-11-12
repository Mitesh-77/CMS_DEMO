const connect = require('../config/configuration')
let models = connect.db
const url = connect.mongoDbUrl
const Post = require('../models/PostModel');
const Category = require('../models/CategoryModel');
const Furnished = require('../models/FurnishedModel');
const Header = require('../models/HeaderModel');
const Button = require('../models/ButtonModel');
const { isEmpty } = require('../config/customFunctions');
const mongoose = require('mongoose')
mongoose.connect(url)
let db = mongoose.connection

module.exports = {


    index: async (req, res) => {
        const btns = await Button.find();
        Header.find()
            .then(headers => {
                res.render('admin/index', { headers: headers });
            });
    },


    /* ADMIN POSTS ENDPOINTS */


    getPosts: (req, res) => {
        Post.find()
            .populate('category')
            .then(posts => {
                res.render('admin/posts/index', { posts: posts });
            });
    },


    createPostsGet: (req, res) => {
        Category.find().then(cats => {

            res.render('admin/posts/create', { categories: cats });
        });


    },

    submitPosts: (req, res) => {

        const commentsAllowed = req.body.allowComments ? true : false;

        // Check for any input file
        let filename = '';

        if (!isEmpty(req.files)) {
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';

            file.mv(uploadDir + filename, (err) => {
                if (err)
                    throw err;
            });
        }

        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            allowComments: commentsAllowed,
            category: req.body.category,
            file: `/uploads/${filename}`
        });

        newPost.save().then(post => {
            req.flash('success-message', 'Post created successfully.');
            res.redirect('/admin/posts');
        });


    },


    editPostGetRoute: (req, res) => {
        const id = req.params.id;

        Post.findById(id)
            .then(post => {

                Category.find().then(cats => {
                    res.render('admin/posts/edit', { post: post, categories: cats });
                });


            })
    },

    editPostUpdateRoute: (req, res) => {
        const commentsAllowed = req.body.allowComments ? true : false;
        console.log(req)
        // Check for any input file
        let filename = '';
        if (!isEmpty(req.files)) {
            let file = req.files.uploadedNewFile;

            filename = file.name;
            let uploadDir = './public/uploads/';

            file.mv(uploadDir + filename, (err) => {
                if (err)
                    throw err;
            });
        }
        const id = req.params.id;

        Post.findById(id)
            .then(post => {
                post.title = req.body.title;
                post.file = req
                post.status = req.body.status;
                post.allowComments = commentsAllowed;
                post.description = req.body.description;
                post.category = req.body.category;
                post.file = `/uploads/${filename}`


                post.save().then(updatePost => {
                    req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                    res.redirect('/admin/posts');

                });
            });

    },

    deletePost: (req, res) => {

        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {
                req.flash('success-message', `The post ${deletedPost.title} has been deleted.`);
                res.redirect('/admin/posts');
            });
    },


    /* ALL CATEGORY METHODS*/
    getCategories: (req, res) => {

        Category.find().then(cats => {
            res.render('admin/category/index', { categories: cats });
        });
    },

    createCategories: (req, res) => {
        const categoryName = req.body.name;
        const categoryTextSize = req.body.txt_size;
        const categoryFontFamily = req.body.txt_font_family;
        const categoryTextColor = req.body.txt_color;

        if (categoryName) {
            const newCategory = new Category({
                title: categoryName,
                txt_size: categoryTextSize,
                txt_font_family: categoryFontFamily,
                txt_color: categoryTextColor
            });

            newCategory.save().then(category => {
                res.status(200).json(category);
            });
        }

    },

    editCategoriesGetRoute: async (req, res) => {
        const catId = req.params.id;

        const cats = await Category.find();


        Category.findById(catId).then(cat => {

            res.render('admin/category/edit', { category: cat, categories: cats });

        });
    },


    editCategoriesPostRoute: (req, res) => {
        const catId = req.params.id;
        const newTitle = req.body.title;
        const newTextSize = req.body.txt_size;
        const newFontFamily = req.body.txt_font_family;
        const newTextColor = req.body.txt_color
        if (newTitle) {
            Category.findById(catId).then(category => {

                category.title = newTitle;
                category.txt_size = newTextSize;
                category.txt_font_family = newFontFamily;
                category.txt_color = newTextColor;

                category.save().then(updated => {
                    res.status(200).json({ url: '/admin/category' });
                });

            });
        }
    },

    deleteCategory: (req, res) => {

        Category.findByIdAndDelete(req.params.id)
            .then(deletedcat => {
                req.flash('success-message', `The category
                 ${deletedcat.title} has been deleted.`);
                res.redirect('/admin/category');
            });
    },

    /* ALL Furnished METHODS*/
    getFurnished: (req, res) => {

        Furnished.find().then(types => {
            res.render('admin/furnished/index', { ftypes: types });
        });
    },

    createFurnished: (req, res) => {
        const FurnishedNumber = req.body.number;
        const FurnishedName = req.body.title;
        const FurnishedTextSize = req.body.txt_size;
        const FurnishedFontFamily = req.body.txt_font_family;
        const FurnishedTextColor = req.body.txt_color;
        if (FurnishedName) {
            const newFurnished = new Furnished({
                number: FurnishedNumber,
                title: FurnishedName,
                txt_size: FurnishedTextSize,
                txt_font_family: FurnishedFontFamily,
                txt_color: FurnishedTextColor
            });

            newFurnished.save().then(Furnished => {
                res.status(200).json(Furnished);
            });
        }

    },

    editFurnishedGetRoute: async (req, res) => {
        const FurId = req.params.id;

        const ftypes = await Furnished.find();


        Furnished.findById(FurId).then(ftype => {

            res.render('admin/furnished/edit', { furnished: ftype, furnisheds: ftypes });

        });
    },


    editFurnishedPostRoute: (req, res) => {
        const furId = req.params.id;
        const newNumber = req.body.number
        const newTitle = req.body.title;
        const newTextSize = req.body.txt_size;
        const newFontFamily = req.body.txt_font_family;
        const newTextColor = req.body.txt_color;
        if (newTitle) {
            Furnished.findById(furId).then(Furnished => {

                Furnished.number = newNumber;
                Furnished.title = newTitle;
                Furnished.txt_size = newTextSize;
                Furnished.txt_font_family = newFontFamily;
                Furnished.txt_color = newTextColor;


                Furnished.save().then(updated => {
                    res.status(200).json({ url: '/admin/furnished' });
                });

            });
        }
    },

    deleteFurnished: (req, res) => {
        Furnished.findByIdAndDelete(req.params.id)
            .then(deletedftype => {
                req.flash('success-message', `The Furnished type ${deletedftype.title} has been deleted.`);
                res.redirect('/admin/furnished');
            });
    },

    // All Heders  Methos
    createHeader: (req, res) => {
        const Header_titile = req.body.title;
        let filename = '';
        if (!isEmpty(req.files)) {
            let file = req.files.uploadedFile;

            filename = file.name;
            let uploadDir = './public/images/';

            file.mv(uploadDir + filename, (err) => {
                if (err)
                    throw err;
            });
        }
        const newHeader = new Header({
            title: Header_titile,
            file: `/images/${filename}`
        });
        newHeader.save().then(header => {
            req.flash('success-message', 'Header created successfully.');
            res.redirect('/admin');
        });

    },

    editHeaderGetRoute: async (req, res) => {
        const headerId = req.params.id;

        const headers = await Header.find();


        Header.findById(headerId).then(header => {

            res.render('admin/header/edit', { header: header, headers: headers });

        });
    },


    editHeaderPostRoute: (req, res) => {
        let filename = '';
        if (!isEmpty(req.files)) {
            let file = req.files.uploadedNewFile;

            filename = file.name;
            let uploadDir = './public/images/';

            file.mv(uploadDir + filename, (err) => {
                if (err)
                    throw err;
            });
        }
        const id = req.params.id;

        Header.findById(id)
            .then(header => {
                header.title = req.body.title;
                header.file = `/images/${filename}`


                header.save().then(updateHeader => {
                    req.flash('success-message', `The Header ${updateHeader.title} has been updated.`);
                    res.redirect('/admin');

                });
            });
    },

    deleteHeader: (req, res) => {
        Header.findByIdAndDelete(req.params.id)
            .then(deletedheader => {
                req.flash('success-message', `The Header ${deletedheader.title} has been deleted.`);
                res.redirect('/admin');
            });
    },

    /* ALL Button METHODS*/
    getButtons: (req, res) => {

        Button.find().then(btns => {
            res.render('admin/button/index', { buttons: btns });
        });
    },

    createButton: (req, res) => {
        const btn_name = req.body.title;
        const btn_clr = req.body.color;
        const TextSize = req.body.btn_text_size
        const TextColor = req.body.btn_text_color
        const FontFamily = req.body.btn_font_family
        const btn_link = req.body.btn_link;
        if (btn_name) {
            const newButton = new Button({
                title: btn_name,
                btn_clr: btn_clr,
                btn_link: btn_link,
                btn_text_size: TextSize,
                btn_font_family: FontFamily,
                btn_text_clr: TextColor,
            });

            newButton.save().then(btn => {
                req.flash('success-message', 'Button created successfully.');
                res.redirect('/admin/button');
            });
        }

    },

    editButtonGetRoute: async (req, res) => {
        const btnId = req.params.id;

        const btns = await Button.find();


        Button.findById(btnId).then(btn => {

            res.render('admin/button/edit', { button: btn, buttons: btns });

        });
    },


    editButtonPostRoute: (req, res) => {
        const btnId = req.params.id;
        const newColor = req.body.color
        const newTitle = req.body.title;
        const newTextColor = req.body.btn_text_color;
        const newTextSize = req.body.btn_text_size
        const newFontFamily = req.body.btn_font_family
        const newLink = req.body.btn_link

        if (newTitle) {
            Button.findById(btnId).then(btn => {

                btn.title = newTitle;
                btn.btn_clr = newColor;
                btn.btn_link = newLink;
                btn.btn_text_clr = newTextColor;
                btn.btn_text_size = newTextSize;
                btn.btn_font_family = newFontFamily

                btn.save().then(updated => {
                    res.redirect('/admin/button');
                });

            });
        }
    },

    deleteButton: (req, res) => {

        Button.findByIdAndDelete(req.params.id)
            .then(deletedbtn => {
                req.flash('success-message', `The Button
                 ${deletedbtn.title} has been deleted.`);
                res.redirect('/admin/button');
            });
    },

    /* ALL Model METHODS*/
    getModel: (req, res) => {
        console.log(models)
        res.render('admin/model/index', { model: models });
    },

    createModel: (req, res) => {
        const title = req.body.title.toLowerCase()
        let i, collection = true;
        for (i = 0; i < models.length; i++) {
            if (models[i].title === title) {
                collection = false
                req.flash('error-message', `Aleady exits.`);
                res.redirect("/admin/model")
            }
        }
        if (collection === true) {
            db.createCollection(title).then((err) => {
                models.push({ title: title })
                res.redirect("/admin/model")
            })
        }
    },

    deleteModel: (req, res) => {
        title = req.params.title
        db.dropCollection(title).then((err) => {
            models = models.filter(record => record.title !== title)
            res.redirect("/admin/model")
        })
    },

    /* ALL Schema METHODS*/
    getModelNames: (req, res) => {
        res.render('admin/schema/index', { model: models });
    },

    createSchema: async (req, res) => {
        const model = req.params.model
        const title = req.body.title.toLowerCase()
        const type = req.body.type
        console.log(model)
        const required = req.body.required == 'true' ? [req.body.required] : []
        const data = { properties: { [title]: { type: type } }, required: required }
        res.redirect(`/model/update/${model}`, { modelSchema: data })
    },



};

