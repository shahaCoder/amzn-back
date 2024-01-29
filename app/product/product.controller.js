import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

export const createProduct = asyncHandler(async (req, res) => {
    const {title, img, price, link, lastPrice, uniCode} = req.body
    try {
        const decodedUniCode = decodeURIComponent(uniCode);
        const product = await prisma.product.create({
            data: {
                title: title.toUpperCase(),
                price: +price,
                img,
                link,
                lastPrice: +lastPrice,
                uniCode: decodedUniCode
            },
        });
        res.json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export const getProducts = asyncHandler(async (req, res) => {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    res.json(products)
})

export const updateProduct = asyncHandler(async (req, res) => {
    const {title, img, price, link, lastPrice, uniCode} = req.body
    const decodedUniCode = decodeURIComponent(uniCode);
    try {
        const product = await prisma.product.update({
            where: {
                id: +req.params.id,
            },
            data: {
                title,
                price: +price,
                img,
                link, 
                lastPrice,
                uniCode: decodedUniCode
            },
        });
        res.json(product);
    } catch (error) {
        console.error('Error updating book:', error);
    }
})

export const deleteProduct = asyncHandler(async(req, res) => {
        try {
            const product = await prisma.product.delete({
                where: {
                    id: +req.params.id,
                },
            });
            res.json({message: 'Product deleted'});
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    })

    export const getProductByTitle = asyncHandler(async (req, res) => {
        const searchTerm = req.params.title.trim().toUpperCase();
        if (!searchTerm) {
            return res.status(400).json({ error: 'Parameter :title is required' });
        }
        try {
            const products = await prisma.product.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                startsWith: searchTerm,
                                mode: 'insensitive', // Для поиска без учета регистра
                            },
                        },
                        {
                            uniCode: {
                                startsWith: searchTerm,
                                mode: 'insensitive', // Для поиска без учета регистра
                            },
                        },
                    ],
                },
            });
            res.json(products);
        } catch (error) {
            console.error('Error getting products:', error);
            res.status(500).json({ error: error.message });
        }
    });