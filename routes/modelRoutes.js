const Ajv = require('ajv');
const Router = require("express");
const body = require("express-validator").body;
const modelController = require("../controllers/modelController");
const validation = require("../middleware/validation");

const router = Router();
const modelSchema = require("../schema/model_schema");


//Get All Model & Their Schema
router.get("/", async (req, res) => {
    res.json(await modelController.getAllModels());
});

//Get Specific Model
router.get("/:name", async (req, res) => {
    try {
        const model = await modelController.getModelByName(req.params.name);
        if (!model) {
            res.sendStatus(404);
        }
        res.json(model);
    } catch {
        res.json(500);
    }
});

//Add Model With Schema
router.post(
    "/",
    body("name")
        .trim()
        .custom(async (value, { req }) => {
            if (value.includes(" ") || value.includes("/")) {
                return Promise.reject("Name Does not contain spaces or slash");
            }
            if (await modelSchema.modelModel.findOne({ name: value })) {
                return Promise.reject("Already Exist");
            }
        }),
    body("modelSchema")
        .trim()
        .custom(async (value, { req }) => {
            const ajv = new Ajv();
            try {
                const schemaObj = JSON.parse(value);
                const isValid = await ajv.validateSchema(schemaObj);
                if (!isValid) throw Error();
                ajv.compile(schemaObj);
            } catch {
                return Promise.reject("Invalid Schema");
            }
        }),
    validation.validatonCheck,
    async (req, res) => {
        try {
            await modelController.createModel(req.body.name, JSON.parse(req.body.modelSchema));
            res.sendStatus(201);
        } catch {
            res.sendStatus(500);
        }
    }
);

//Update Model With Schema
router.put(
    "/update/:name",
    body("modelSchema")
        .trim()
        .custom(async (value, { req }) => {
            const ajv = new Ajv();
            try {
                const schemaObj = JSON.parse(value);
                // console.log(schemaObj)
                const isValid = await ajv.validateSchema(schemaObj);
                if (!isValid) throw Error();
                ajv.compile(schemaObj);
            } catch {
                return Promise.reject("Invalid Schema");
            }
        }),
    validation.validatonCheck,
    async (req, res) => {
        try {
            const modelschema = JSON.parse(req.body.modelSchema)
            console.log(modelschema)
            const oldSchema = await modelController.getModelByName(req.params.name);
            const properties = Object.assign(oldSchema.modelSchema.properties, modelschema.properties)
            let required = oldSchema.modelSchema.required

            if (modelschema.required.length !== 0) {
                required = required.concat(modelschema.required)
            }
            await modelController.updateSchemaByName(req.params.name, properties, required);
            res.sendStatus(201);
        } catch {
            res.sendStatus(400);
        }
    }
);

module.exports = router;
