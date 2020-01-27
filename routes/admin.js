const express = require('express');
const router = express.Router();
const carouselController = require('./../controllers/carousel.js')
const permissionController = require('./../controllers/permission.js')
const roleController = require('./../controllers/role.js')
const Auth = require('./../middlewares/auth.js')

router.use(Auth.isLogin);
// 轮播图管理
router.get('/carousel', Auth.permission('carousel-manager'), carouselController.index);
router.post('/carousel', Auth.permission('carousel-manager'), carouselController.store);
router.put('/carousel/:id', Auth.permission('carousel-manager'), carouselController.update);
router.delete('/carousel/:id', Auth.permission('carousel-manager'), carouselController.destroy);
// 角色管理
router.get('/role', roleController.index);
router.post('/role', roleController.store);
router.put('/role/:id', roleController.update);
router.delete('/role/:id', roleController.destroy);
// 用户角色管理
router.get('/role/:id/users', roleController.getUsers);
router.post('/role/:id/users', roleController.storeUsers);
router.delete('/role/:id/users', roleController.destoryUsers);
// 角色权限管理
router.get('/permissions', permissionController.index);
router.get('/role/:id/permissions', roleController.getPermissions);
router.put('/role/:id/permissions', roleController.updatePermissions);

module.exports = router;
