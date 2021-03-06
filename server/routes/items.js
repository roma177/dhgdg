const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/items");
const authenticate = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateIdParam = require("../middleware/validateIdParam");
const validateItemBody = require("../middleware/validateItemBody");

/* eslint-disable max-len */
/**
 * @apiDefine AuthHeader
 * @apiHeader {String} Authorization User'd JSON web token prefixed with "Bearer: "
 * @apiHeaderExample {json} Header example
 * {
 *   "Authorization": "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * }
 */
/* eslint-enable max-len */
/**
 * @apiDefine ItemRequestBody
 * @apiParam (Request body) {String} title Title of the item
 * @apiParam (Request body) {String} [artist] Item's artist
 * @apiParam (Request body) {String} [image] URL of the item's image
 * @apiParam (Request body) {Number} [year] Year of the item's creation
 * @apiParam (Request body) {Number} [price] Price of the item
 * @apiParamExample {json} Request body example
 * {
 *   "title": "Self-Portrait",
 *   "artist": "Vincent van Gogh",
 *   "year": 1889,
 *   "image": "https://images.nga.gov/?service=asset&action=show_preview&asset=149207",
 *   "price": 29.95
 * }
 */
/**
 * @apiDefine 400
 * @apiError BadRequest The supplied parameters were invalid
 */
/**
 * @apiDefine 401
 * @apiError Unauthorized The supplied token was invalid
 */
/**
 * @apiDefine 403
 * @apiError Forbidden The user does not have permission for this resource
 */
/**
 * @apiDefine 404
 * @apiError NotFound The supplied id did not match an existing record
 */
/**
 * @apiDefine ItemResponse200
 * @apiParam (200) {String} title Title of the item
 * @apiParam (200) {String} [artist] Item's artist
 * @apiParam (200) {String} [image] URL of the item's image
 * @apiParam (200) {Number} [year] Year of the item's creation
 * @apiParam (200) {Number} [price] Price of the item
 */
router
  .route("/")
  /**
   * @api {get} /items Fetch all items
   * @apiGroup Item
   * @apiName GetItems
   * @apiVersion 1.0.0
   * @apiPermission none
   * @apiSuccess (200) {Object[]} items Array of item objects
   * @apiSuccess (200) {String} items.title Title of the item
   * @apiSuccess (200) {String} items.artist Item's artist
   * @apiSuccess (200) {String} items.image URL of the item's image
   * @apiSuccess (200) {String} items.year Year of the item's creation
   * @apiSuccess (200) {String} items.price Price of the item
   */
  .get(ItemController.fetch)
  .all(authenticate, admin)
  .all(validateItemBody)
  /**
   * @api {post} /items Create an item
   * @apiGroup Item
   * @apiName PostItems
   * @apiVersion 1.0.0
   * @apiPermission admin
   * @apiUse AuthHeader
   * @apiUse ItemRequestBody
   * @apiUse ItemResponse200
   * @apiUse 401
   * @apiUse 403
   * @apiUse 404
   */
  .post(ItemController.create);

router
  .route("/:id")
  .all(validateIdParam)
  /**
   * @api {get} /items/:id Read an item
   * @apiName GetItemsId
   * @apiGroup Item
   * @apiVersion 1.0.0
   * @apiPermission none
   * @apiParam {String} id Item's id
   * @apiUse ItemResponse200
   * @apiUse 404
   */
  .get(ItemController.read)
  .all(authenticate, admin)
  /**
   * @api {delete} /items/:id Delete an item
   * @apiGroup Item
   * @apiName DeleteItemsId
   * @apiVersion 1.0.0
   * @apiParam {String} id Item's id
   * @apiPermission admin
   * @apiUse AuthHeader
   * @apiUse 401
   * @apiUse 403
   * @apiUse 404
   */
  .delete(ItemController.delete)
  .all(validateItemBody)
  /**
   * @api {patch} /items/:id Update an item
   * @apiGroup Item
   * @apiName PatchItemsId
   * @apiVersion 1.0.0
   * @apiPermission admin
   * @apiUse AuthHeader
   * @apiUse ItemRequestBody
   * @apiPermission admin
   * @apiParam {String} id Item's id
   * @apiUse ItemResponse200
   * @apiUse 400
   * @apiUse 401
   * @apiUse 403
   * @apiUse 404
   */
  .patch(ItemController.update);

module.exports = router;
