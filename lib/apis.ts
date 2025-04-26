import axios from "axios";

import {axiosInstance} from "../lib/axios";
import {Product} from "./types";

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  try {
    const response = await axiosInstance.get<Product[]>("/products", {signal});
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch products");
  }
}

export async function getProduct(id: string, signal?: AbortSignal): Promise<Product> {
  try {
    const response = await axiosInstance.get<Product>(`/products/${id}`, {signal});
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch product");
  }
}

export async function getCategories(signal?: AbortSignal): Promise<string[]> {
  try {
    const response = await axiosInstance.get<string[]>("/products/categories", {signal});
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch categories");
  }
}

export async function getProductsByCategory(
  category: string,
  signal?: AbortSignal
): Promise<Product[]> {
  try {
    const response = await axiosInstance.get<Product[]>(`/products/category/${category}`, {signal});
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch products by category");
  }
}

function handleError(error: unknown, message: string): never {
  if (axios.isCancel(error)) {
    console.warn("Request canceled", error.message);
  } else {
    console.error(message, error);
  }
  throw new Error(message);
}
