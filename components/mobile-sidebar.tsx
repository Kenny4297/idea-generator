"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
import Sidebar from './sidebar';

interface MobileSidebarProps {
    apiLimitCount: number
}


const MobileSidebar = ({apiLimitCount}: MobileSidebarProps) => {
  return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar apiLimitCount={apiLimitCount} />

            </SheetContent>
        </Sheet>
  )
}

export default MobileSidebar