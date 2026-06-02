import z from "zod";

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6)
})

export const UpdateCustomerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "phone number is too short")
})

export const newCustomerSchema = z.object({
  name: z.string().trim().min(3, "Name Must be at least 3 characters"),
  email: z.email("InValid email Address").trim().toLowerCase(),
  phone: z.string().min(10, "Phone number is too short"),
  address: z.string().min(5, "Please provide a full address"),
 status: z.string().refine(
  (val) => ["active", "inactive", "lead", "pending"].includes(val),
  { message: "Please select a valid status" }
)
})

export const newProductSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer")
})

export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>
export type NewCustomerInput = z.infer<typeof newCustomerSchema>
export type NewProductInput = z.infer<typeof newProductSchema>
export {registerSchema} 