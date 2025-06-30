export const calcProductSaleCosts = (cost: Partial<Cost>): { saleCost: string; oldCost: string } => {
  const { saleCost, discountPercentage } = cost;

  const discountCost = (saleCost! / 100) * discountPercentage!;

  return {
    saleCost: `${(saleCost! - discountCost).toLocaleString("vn")}đ`,
    oldCost: `${saleCost?.toLocaleString("vn")}đ`,
  };
};
