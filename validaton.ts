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

export {registerSchema} 
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>