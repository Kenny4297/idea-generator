"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Montserrat } from 'next/font/google';
import { FreeCounter } from './free-counter';

import { cn } from "@/lib/utils"
import { GaugeCircle, Camera, Volume2, MonitorPlay, MessageCircle } from "lucide-react";
import { usePathname } from 'next/navigation';

const montserrat = Montserrat({ weight: "600", subsets: ["latin"]});

const routes = [
  {
    label: "Dashboard",
    icon: GaugeCircle,
    href: "/dashboard",
    color: "text-sky-500"
  },
  {
    label: "Conversation",
    icon: MessageCircle,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/conversation"
  },
  {
    label: "Music Generation",
    icon: Volume2,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    href: "/music"
  },
  {
    label: "Image Generation",
    icon: Camera,
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    href: "/image"
  },
  {
    label: "Video Generation",
    icon: MonitorPlay,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video"
  },
]

interface SidebarProps {
  apiLimitCount: number;
}

const Sidebar = ({apiLimitCount = 0}: SidebarProps) => {
  const pathname = usePathname();

  // Original Background: #111827

  return (
    <div className="space-y-4 h-full py-4 flex flex-col bg-[#333333] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>

          <h1 className={cn('text-2xl font-bold', montserrat.className)}>Idea Generator</h1>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname === route.href ? "text-white bg-white/10" : "text-white")}>
                <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                    {route.label}

                </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <FreeCounter apiLimitCount={apiLimitCount} />
      </div>


    </div>
  )
}

export default Sidebar