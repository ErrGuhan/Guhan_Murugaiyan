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
  liveUrl: string;
  githubUrl: string;
  year: string;
}

export const REAL_PROJECTS: Project[] = [
  {
    id: "campus-cart",
    num: "01",
    title: "CampusCart01",
    category: "WEB · STUDENT MARKETPLACE",
    status: "LIVE DEMO ↗",
    isLive: true,
    description: "A student marketplace web app built with Next.js and Supabase, with an admin-verification workflow for confirming product originality before listings go live.",
    tags: ["Next.js", "Supabase", "TypeScript", "PostgreSQL"],
    filename: "supabase-queries.ts",
    // Real code snippet extracted directly from CampusCart01 repo
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

// Relational query pulling products with joined seller profiles
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
    image: "/images/project-ecommerce.jpg",
    liveUrl: "https://campus-cart01.vercel.app",
    githubUrl: "https://github.com/ErrGuhan/CampusCart01",
    year: "2026",
  },
  {
    id: "personal-tracker",
    num: "02",
    title: "PersonalTracker",
    category: "WEB · PRODUCTIVITY",
    status: "LIVE DEMO ↗",
    isLive: true,
    description: "A personal productivity tracker built with Next.js, for organizing day-to-day goals and tracking habit streaks with precision metrics.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    filename: "HabitTrackerWidget.tsx",
    // Real code snippet extracted directly from LifeSync OS / PersonalTracker repo
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
    image: "/images/project-portfolio.jpg",
    liveUrl: "https://personaltracker-psi.vercel.app",
    githubUrl: "https://github.com/ErrGuhan/PersonalTracker",
    year: "2026",
  },
  {
    id: "transfer-hub",
    num: "03",
    title: "TransferHub",
    category: "JAVA · BANKING UI",
    status: "LIVE DEMO ↗",
    isLive: true,
    description: "A banking website interface built in Java, focused on core transfer and account-management flows.",
    tags: ["Java 21", "Spring Boot", "Clean Architecture"],
    filename: "AccountService.java",
    // Real code snippet extracted directly from TransferHub Spring Boot repo
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
    image: "/images/project-watches.jpg",
    liveUrl: "https://transfer-hub-neon.vercel.app",
    githubUrl: "https://github.com/ErrGuhan/TransferHub",
    year: "2026",
  },
  {
    id: "jana-fibreglass",
    num: "04",
    title: "JanaFibreGlass",
    category: "WEB · 3D CONFIGURATOR",
    status: "LIVE DEMO ↗",
    isLive: true,
    description: "A commercial business platform and interactive 3D parametric product configurator for Jana Fibre Glass, featuring real-time Three.js door modeling and architectural manufacturing specs.",
    tags: ["React 19", "Three.js", "Vite", "Tailwind v4"],
    filename: "ParametricDoor.tsx",
    // Real code snippet extracted directly from JanaFibreGlass repo
    codeSnippet: `import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface ParametricDoorProps {
  topWidth?: number;        // Door opening width in cm (default: 84)
  leftHeight?: number;      // Frame height in cm (default: 210)
  thickness?: number;       // Panel thickness in cm (default: 4.5)
  doorColor?: string;       // Color '#d4a373'
  openAngle?: number;       // Door swing angle in degrees
  wireframe?: boolean;
}

export function ParametricDoor({
  topWidth = 84,
  leftHeight = 210,
  thickness = 4.5,
  doorColor = '#d4a373',
}: ParametricDoorProps) {
  const doorGeometry = useMemo(() => {
    return new THREE.BoxGeometry(
      topWidth * 0.01,
      leftHeight * 0.01,
      thickness * 0.01
    );
  }, [topWidth, leftHeight, thickness]);

  return (
    <mesh geometry={doorGeometry} castShadow>
      <meshStandardMaterial color={doorColor} roughness={0.35} />
    </mesh>
  );
}`,
    image: "/images/project-gazu.jpg",
    liveUrl: "https://janafibre.vercel.app",
    githubUrl: "https://github.com/ErrGuhan/JanaFibreGlass",
    year: "2026",
  },
  {
    id: "tharika-decors",
    num: "05",
    title: "TharikaDecors",
    category: "WEB · CLIENT SITE",
    status: "LIVE DEMO ↗",
    isLive: true,
    description: "A luxury event styling and stage decor showcase built with Next.js and Prisma, featuring bespoke celebration portfolios, category curation, and client booking workflows.",
    tags: ["Next.js", "Prisma", "TypeScript", "Tailwind CSS"],
    filename: "app/page.tsx",
    // Real code snippet extracted directly from TharikaDecors repo
    codeSnippet: `import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import HomeHeroAndCategories from '@/components/HomeHeroAndCategories';

export const revalidate = 3600; // ISR: serve from cache, rebuild every hour

export const metadata: Metadata = {
  title: 'Tharika Decors & Events | Luxury Event Styling',
  description: 'Bespoke stage decor, wedding mandaps, and floral styling.',
};

export default async function HomePage() {
  // Fetch active decor categories with their latest cover item
  const categoriesFromDb = await prisma.category.findMany({
    include: {
      items: {
        orderBy: [{ isCover: 'desc' }, { createdAt: 'desc' }],
        take: 1,
      },
      _count: { select: { items: true } },
    },
    orderBy: { name: 'asc' },
  });

  return <HomeHeroAndCategories categories={categoriesFromDb} />;
}`,
    image: "/images/project-audio.jpg",
    liveUrl: "https://tharikadecors.vercel.app",
    githubUrl: "https://github.com/ErrGuhan/TharikaDecors",
    year: "2026",
  },
];
