/*global QUnit*/
import Controller from "miyasuta/showuserinfo/controller/User.controller";

QUnit.module("User Controller");

QUnit.test("I should test the User controller", function (assert: Assert) {
	const oAppController = new Controller("User");
	oAppController.onInit();
	assert.ok(oAppController);
});