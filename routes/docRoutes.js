const Ajv = require('ajv');
const Router = require("express");
const body = require("express-validator").body;
const docController = require("../controllers/docController");
const modelController = require("../controllers/modelController");
const validation = require("../middleware/validation");

const router = Router();

//Get All Docs Form Specific Model
router.get("/:name", async (req, res) => {
    try {
        console.log(req.params.name);
        res.json(await docController.getDocByModelName(req.params.name.trim()));
    } catch {
        res.sendStatus(500);
    }
});

router.post(
    "/:name",
    body("data").isString(),
    validation.validatonCheck,
    async (req, res) => {
        try {
            const model = await modelController.getModelByName(req.params.name);
            if (!model) {
                res.sendStatus(404);
                return;
            }
            const ajv = new Ajv();
            //@ts-ignore
            const validator = ajv.compile(model.modelSchema);
            console.log(req.body.data);
            // const newData = { name: "button1", color: "red" };
            const isValid = validator(JSON.parse(req.body.data));
            // const isValid = validator(newData);

            if (!isValid) {
                console.error(validator.errors);
                res.sendStatus(403);
                return;
            }
            await docController.addData(model.name, model._id, JSON.parse(req.body.data));
            res.json(201);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
);

router.put("/:name/:id",
    body("data").isString(),
    validation.validatonCheck,
    async (req, res) => {
        try {
            const data_id = req.params.id
            const model = await modelController.getModelByName(req.params.name);
            if (!model) {
                res.sendStatus(404);
                return;
            }
            const ajv = new Ajv();
            //@ts-ignore
            const validator = ajv.compile(model.modelSchema);
            console.log(req.body.data);
            // const newData = { name: "button1", color: "red" };
            const isValid = validator(JSON.parse(req.body.data));
            // const isValid = validator(newData);

            if (!isValid) {
                console.error(validator.errors);
                res.sendStatus(403);
                return;
            }
            await docController.updateData(data_id, JSON.parse(req.body.data));
            res.json(201);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
)

router.delete("/:id", async (req, res) => {
    try {
        await docController.deleteData(req.params.id);
    } catch {
        res.sendStatus(404);
    }
});

//Get Specific Doc With Name //TODO
// router.post(
//   "/:name",
//   body("name")
//     .trim()
//     .custom(async (value: string, { req }) => {
//       if (value.includes(" ") || value.includes("/")) {
//         return Promise.reject("Name Does not contain spaces or slash");
//       }
//       if (await modelModel.findOne({ name: value })) {
//         return Promise.reject("Already Exist");
//       }
//     }),
//   body("modelSchema")
//     .trim()
//     .custom(async (value: string, { req }) => {
//       const ajv = new Ajv();
//       try {
//         const schemaObj = JSON.parse(value);
//         const isValid = await ajv.validateSchema(schemaObj);
//         if (!isValid) throw Error();
//         ajv.compile(schemaObj);
//       } catch {
//         return Promise.reject("Invalid Schema");
//       }
//     }),
//   validatonCheck,
//   (req, res) => {}
// );

module.exports = router;
