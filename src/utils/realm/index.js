import Realm from "realm";
export const MetodePembayaranSchema = {
    name: "MetodePembayaran",
    properties: {
        id: "int",
        name: "string",
    },
    primaryKey: "id",
};
export const ProductSchema = {
    name: "Product",
    properties: {
        id: "int",
        name: "string",
        harga_jual: "int",
        harga_beli: "int",
        is_stock: "bool",
        stock_jumlah: "int",
        stock_minimum: "int",
        created_at: "date",
        updated_at: "date",

        // status: "string?",
    },
    primaryKey: "id",
};
export const ProductCheckoutSchema = {
    name: "ProductCheckout",
    primaryKey: "_id",
    properties: {
        _id: "string",
        fk_product: "int",
        harga_diskon: "int",
        harga_diskon_persentase: "int",
        harga_jual: "int",
        harga_jual_sub_total: "int",
        harga_jual_total: "int",
        qty: "int",
        nama_product: 'string'
    }
};
export const InvoiceSchema = {
    name: "Invoice",
    properties: {
        id: "int",
        code: "string",
        fk_metode_pembayaran: "int",
        total_qty: "int",
        total_dibayar: "int",
        total_pembayaran: "int",
        uang_kembali: "int",
        nama_product: "string",
        metode_pembayaran: "string",
        ProductCheckout: "ProductCheckout[]",
        created_at: "date",
        updated_at: "date",
        // status: "string?",
    },
    primaryKey: "id",
};

const realm =  new Realm({
        // path: "cashier",
        schema: [MetodePembayaranSchema, ProductSchema, ProductCheckoutSchema, InvoiceSchema],
    });

export default realm;
