import productsJson from "@/data/products.json";
import type { EMIPlan, Product } from "@/types/marketplace";

const PRODUCTS = productsJson as Product[];
const DELAY_MS = 650;
const TENURES = [3, 6, 9, 12];

function delay<T>(value: T, ms = DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export class MarketplaceApiError extends Error {}

export async function getProducts(opts?: { simulateError?: boolean }): Promise<Product[]> {
  if (opts?.simulateError) {
    await delay(null);
    throw new MarketplaceApiError("Could not load the marketplace right now.");
  }
  return delay(PRODUCTS);
}

export async function getProductById(id: string, opts?: { simulateError?: boolean }): Promise<Product | null> {
  if (opts?.simulateError) {
    await delay(null);
    throw new MarketplaceApiError("Could not load this product right now.");
  }
  return delay(PRODUCTS.find((p) => p.id === id) ?? null);
}

export function calculateEMIPlans(price: number): EMIPlan[] {
  const plans: EMIPlan[] = TENURES.map((tenureMonths) => ({
    id: `${tenureMonths}m`,
    tenureMonths,
    monthlyAmount: Math.round(price / tenureMonths),
    interestRate: 0,
    processingFee: 0,
    totalPayable: price,
    noCost: true,
  }));
  const target = price * 0.08;
  plans.reduce((closest, plan) =>
    Math.abs(plan.monthlyAmount - target) < Math.abs(closest.monthlyAmount - target) ? plan : closest
  ).recommended = true;
  return plans;
}

export async function getEMIPlans(productId: string, variantId: string, opts?: { simulateError?: boolean }): Promise<EMIPlan[]> {
  if (opts?.simulateError) {
    await delay(null);
    throw new MarketplaceApiError("Could not load EMI plans right now.");
  }
  const product = PRODUCTS.find((p) => p.id === productId);
  const variant = product?.variants.find((v) => v.id === variantId);
  if (!product || !variant) return delay([]);
  return delay(calculateEMIPlans(variant.price));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}