import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";

import {ArrowLeft, Star} from "lucide-react";

import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {getProduct, getProducts} from "@/lib/apis";
import {Product} from "@/lib/types";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({params}: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProduct(await params.id);
    return {
      title: `${product.title} | ShopCatalog`,
      description: product.description,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      title: "Product Not Found | ShopCatalog",
      description: "The requested product could not be found",
    };
  }
}

// Generates static parameters for pre-rendering product pages
export async function generateStaticParams() {
  const products = await getProducts();
  return products.slice(0, 5).map(product => ({
    id: product.id.toString(),
  }));
}

function ProductImage({product}: {product: Product}) {
  return (
    <Card className="overflow-hidden py-0">
      <CardContent className="p-0">
        <AspectRatio ratio={4 / 3}>
          <figure className="relative h-full w-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
            <figcaption className="sr-only">{product.title}</figcaption>
          </figure>
        </AspectRatio>
      </CardContent>
    </Card>
  );
}

function ProductDetails({product}: {product: Product}) {
  return (
    <div className="flex flex-col gap-4">
      <Badge
        variant="secondary"
        className="w-fit">
        {product.category}
      </Badge>

      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">{product.title}</h1>

      <div
        className="flex items-center gap-2"
        role="region"
        aria-label={`Rating: ${product.rating.rate} out of 5`}>
        <div className="flex items-center">
          <Star
            className="h-5 w-5 fill-primary text-primary"
            aria-hidden="true"
          />
          <span className="ml-1 font-medium">{product.rating.rate}</span>
        </div>
        <span className="text-sm text-muted-foreground">({product.rating.count} reviews)</span>
      </div>

      <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

      <p className="text-base text-muted-foreground">{product.description}</p>

      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
        <Button
          size="lg"
          className="sm:flex-1"
          aria-label="Add to cart">
          Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="sm:flex-1"
          aria-label="Add to wishlist">
          Add to Wishlist
        </Button>
      </div>
    </div>
  );
}

export default async function ProductPage({params}: ProductPageProps) {
  const product = await getProduct(await params.id);

  // When we invoke notFound() within a route segment (e.g., app/products/[id]/page.tsx), Next.js will look for a not-found.tsx file within that segment. If it doesn't find one, it will fall back to the global app/not-found.tsx file.
  if (!product) {
    notFound();
  }

  return (
    <div className="p-4">
      {/* Back Button */}
      <Button
        asChild
        variant="ghost"
        className="mb-6 text-sm text-muted-foreground hover:text-primary">
        <Link
          href="/products"
          aria-label="Back to products">
          <ArrowLeft
            className="mr-1 size-4"
            aria-hidden="true"
          />
          Back to products
        </Link>
      </Button>

      <section
        className="grid md:grid-cols-2 gap-6 lg:gap-8"
        aria-labelledby="product-title">
        <ProductImage product={product} />
        <ProductDetails product={product} />
      </section>
    </div>
  );
}
