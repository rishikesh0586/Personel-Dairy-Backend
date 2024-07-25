
import express from 'express';
import { createProduct } from '../../Controllers/Ecommerce/Product.Controller.js';

const router = express.Router();

router.post('/ecommerce/products/create', createProduct);