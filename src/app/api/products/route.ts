import { cloudinary } from "@/lib/cloudinary";
import { Product } from "@/lib/db/models/Product";
import { connectToDatabase } from "@/lib/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  const products = await Product.find();
  console.log(products);

  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const stock = formData.get("stock") as string;

  if (!file || !name || !price || !stock) {
    return NextResponse.json(
      { error: "Eksik bilgi gönderildi." },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    await connectToDatabase();

    // Cloudinary'ye resmi yükle
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    const imageUrl = (uploadResult as any).secure_url;

    // Ürünü veritabanına kaydet
    const newProduct = await Product.create({
      name,
      price: parseFloat(price),
      description,
      stock: parseInt(stock),
      image: imageUrl,
    });

    return NextResponse.json({
      message: "Ürün başarıyla oluşturuldu.",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ürün oluşturulamadı." },
      { status: 500 }
    );
  }
}
