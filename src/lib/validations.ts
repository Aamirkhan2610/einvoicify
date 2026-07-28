import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(120, "Name is too long"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(200).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  turnoverBand: z.string().max(80).optional().or(z.literal("")),
  erpSystem: z.string().max(120).optional().or(z.literal("")),
  type: z
    .enum(["GENERAL", "DEMO", "PRICE", "PRODUCT", "SUPPORT", "INTEGRATION"])
    .optional(),
});

export const demoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().min(2, "Company name is required").max(200),
  jobTitle: z.string().max(120).optional().or(z.literal("")),
  erpSystem: z.string().max(120).optional().or(z.literal("")),
  monthlyInvoices: z.string().max(80).optional().or(z.literal("")),
  turnoverBand: z.string().max(80).optional().or(z.literal("")),
  notes: z.string().max(3000).optional().or(z.literal("")),
  preferredDate: z.string().optional().or(z.literal("")),
});

export const subscribeSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  name: z.string().max(120).optional().or(z.literal("")),
});

export const chatStartSchema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(200).optional().or(z.literal("")),
  topic: z.string().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .min(5, "Please enter a short message")
    .max(3000, "Message is too long"),
  sessionId: z.string().max(80).optional(),
});

export const chatMessageSchema = z.object({
  sessionId: z.string().min(8).max(80),
  body: z.string().min(1).max(3000),
});

export const chatAgentReplySchema = z.object({
  conversationId: z.string().min(1),
  body: z.string().min(1).max(3000),
  agentName: z.string().max(80).optional(),
});

export const crmLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const leadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "CLOSED"]),
  notes: z.string().max(5000).optional(),
});

export const conversationStatusSchema = z.object({
  status: z.enum(["OPEN", "PENDING", "RESOLVED", "CLOSED"]),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type DemoInput = z.infer<typeof demoSchema>;
export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type ChatStartInput = z.infer<typeof chatStartSchema>;
