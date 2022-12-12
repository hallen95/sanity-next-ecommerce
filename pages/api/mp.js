// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mercadopago = require("mercadopago");

export default async function handler(req, res) {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            }
        ],
        back_urls: {
            "success": "https://sanity-next-ecommerce-omega.vercel.app/",
            "failure": "https://sanity-next-ecommerce-omega.vercel.app/",
            "pending": "https://sanity-next-ecommerce-omega.vercel.app/"
        },
        auto_return: "approved",
    };

    mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN_MP);

    const mp = await mercadopago.preferences.create(preference)

    res.status(mp.status).json({
        id: mp.body.id
    })
}
