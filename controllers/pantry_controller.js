const User = require("../models/user");
const Ingredient = require("../models/ingredient");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const asyncHandler = require("express-async-handler");

exports.pantry_get_all = asyncHandler(async (req, res) => {});
exports.pantry_get_single = asyncHandler(async (req, res) => {});
exports.pantry_create = asyncHandler(async (req, res) => {});
exports.pantry_update = asyncHandler(async (req, res) => {});
exports.pantry_delete = asyncHandler(async (req, res) => {});
