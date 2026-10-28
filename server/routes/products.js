const express = require("express")
const { PrismaClient } = require("@prisma/client")

const router = express.Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
    try {
        // 1. Read the query parameters
        const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
        const limit = Math.min(
            50, 
            Math.max(1, Number.parseInt(req.query.limit, 10) || 10)
        )

        const search = (req.query.search || "").trim()
        const category = (req.query.category || "").trim()

        // 2. Build the database filter
        const where = {
            ...(search && {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            }),

            ...(category && {
                category: {
                    equals: category,
                    mode: "insensitive",
                },
            }),
        };

        // 3. Calculate how many products to skip 
        const skip = (page - 1) * limit;

        // 4. Fetch products and count matching products 
        const [products, totalProducts] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take: limit, 
                orderBy: {
                    id: "asc",
                },
            }),

            prisma.product.count({ where }),
        ]);

        // 5. Calculate the total number of pages 
        const totalPages = Math.ceil(totalProducts / limit);

        // 6. Send the response 
        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                page,
                limit, 
                totalProducts,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        });
    } catch (error) {
        console.error("Failed to fetch products:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }
});

module.exports = router;