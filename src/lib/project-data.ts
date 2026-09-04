export interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  status: string;
  isLive: boolean;
  description: string;
  tags: string[];
  filename: string;
  codeSnippet: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  year: string;
}

export const REAL_PROJECTS: Project[] = [
  {
    id: "pdf-analyser",
    num: "01",
    title: "PDF Analyser",
    category: "AI · DOCUMENT PARSING",
    status: "IN DEVELOPMENT",
    isLive: false,
    // TODO(guhan): supply description, stack, and a representative snippet once ready.
    description: "An intelligent document intelligence tool in development, engineered for structured entity extraction and contextual reasoning across complex PDF documents.",
    tags: ["AI", "Document Parsing", "NLP", "In Development"],
    filename: "PDFAnalyserEngine.ts",
    codeSnippet: `// TODO(guhan): supply description, stack, and a representative snippet once ready.
export interface PDFAnalysisConfig {
  ocrEngine: 'vision' | 'heuristic';
  extractTables: boolean;
  confidenceThreshold: number;
}

export async function parseDocumentStream(stream: ReadableStream) {
  // Parsing pipeline under active development
  return { status: "pending_implementation" };
}`,
    image: "/images/project-ai.jpg", // TODO(guhan): supply real screenshot asset
    year: "2026",
  },
  {
    id: "campus-cart",
    num: "02",
    title: "CampusCart01",
    category: "WEB · STUDENT MARKETPLACE",
    status: "LIVE DEMO ↗",
    isLive: true,
    description: "A student marketplace web app built with Next.js and Supabase, with an admin-verification workflow for confirming product originality before listings go live.",
    tags: ["Next.js", "Supabase", "TypeScript"],
    filename: "supabase-queries.ts",
    // Real code snippet extracted from Guhan's CampusCart01 repo
    codeSnippet: `export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  status: ProductStatus;
  isVerified: boolean; // Admin verification workflow
  seller: Seller;
  deliveryAvailable: boolean;
};

// Shared query with relational foreign-key joins
const PRODUCT_SELECT = \`
  *,
  images:product_images(url),
  seller:profiles!products_seller_id_fkey(*),
  category:categories(name)
\`;

export async function getVerifiedProducts() {
  const { data } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('is_verified', true)
    .order('created_at', { ascending: false });
  return data?.map(mapProduct) ?? [];
}`,
    image: "/images/project-ecommerce.jpg", // TODO(guhan): supply real screenshot asset
    liveUrl: "https://campus-cart01.vercel.app",
    githubUrl: "https://github.com/ErrGuhan/CampusCart01",
    year: "2026",
  },
  {
    id: "personal-tracker",
    num: "03",
    title: "PersonalTracker",
    category: "WEB · PRODUCTIVITY",
    status: "LIVE DEMO ↗",
    isLive: true,
    // TODO(guhan): confirm exact scope (habits/expenses/tasks?)
    description: "A personal productivity tracker built with Next.js, for organizing day-to-day goals and tracking habit streaks with precision metrics.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    filename: "HabitTrackerWidget.tsx",
    // Real code snippet extracted from Guhan's LifeSync OS / PersonalTracker repo
    codeSnippet: `"use client";

import { useState } from "react";
import { useHabits } from "@/hooks/useSupabase";

export default function HabitTrackerWidget() {
  const { habits, toggleHabit, addHabit } = useHabits();
  const [pendingHabitId, setPendingHabitId] = useState<string | null>(null);

  const completedCount = habits.filter((h) => h.completedToday).length;
  const completionPct = habits.length > 0
    ? Math.round((completedCount / habits.length) * 100)
    : 0;

  const handleToggle = (id: string) => {
    if (pendingHabitId === id) return;
    setPendingHabitId(id);
    toggleHabit(id);
    setTimeout(() => setPendingHabitId(null), 300);
  };
  // ...
}`,
    image: "/images/project-portfolio.jpg", // TODO(guhan): supply real screenshot asset
    liveUrl: "https://personaltracker-psi.vercel.app",
    githubUrl: "https://github.com/ErrGuhan/PersonalTracker",
    year: "2026",
  },
  {
    id: "transfer-hub",
    num: "04",
    title: "TransferHub",
    category: "JAVA · BANKING UI",
    status: "LIVE DEMO ↗",
    isLive: true,
    description: "A banking website interface built in Java, focused on core transfer and account-management flows.",
    tags: ["Java", "Spring Boot", "Clean Architecture"],
    filename: "AccountService.java",
    // Real code snippet extracted from Guhan's TransferHub repo
    codeSnippet: `package com.example.transferhub.service;

import com.example.transferhub.model.Account;
import com.example.transferhub.model.Transaction;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service 
public class AccountService {
  private final AccountRepository accountRepository;
  private final TransactionRepository transactionRepository;

  public void transferMoney(Long senderId, Long receiverId, BigDecimal amount) {
    Account sender = accountRepository.findById(senderId)
      .orElseThrow(() -> new RuntimeException("Sender account not found!"));
    Account receiver = accountRepository.findById(receiverId)
      .orElseThrow(() -> new RuntimeException("Receiver account not found!"));

    if (sender.getBalance().compareTo(amount) >= 0) {
      sender.setBalance(sender.getBalance().subtract(amount));
      receiver.setBalance(receiver.getBalance().add(amount));
      accountRepository.save(sender);
      accountRepository.save(receiver);

      Transaction receipt = new Transaction();
      receipt.setSenderId(senderId);
      receipt.setReceiverId(receiverId);
      receipt.setAmount(amount);
      transactionRepository.save(receipt);
    }
  }
}`,
    image: "/images/project-watches.jpg", // TODO(guhan): supply real screenshot asset
    liveUrl: "https://transfer-hub-neon.vercel.app",
    githubUrl: "https://github.com/ErrGuhan/TransferHub",
    year: "2026",
  },
];
